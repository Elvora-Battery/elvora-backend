import { RentType } from "../../models/RentTypeModel.js";
import RentTransaction from "../../models/RentTransactionModel.js";
import Users from "../../models/UserModel.js";
import { ShippingDetail } from "../../models/ShippingDetailModel.js";
import Battery from "../../models/BatteryModel.js";
import { Token } from "../../models/TokenModel.js";
import { all } from "axios";
import midtrans from "../../config/midtrans.config.js"
import { Subscription } from "../../models/SubsriptionModel.js";
import { Op } from "sequelize";

const createRentTransaction = async (data, userId)=>{
    try {
        const user = await Users.findOne({
            where :{id: userId},
        });
        const shipping = await ShippingDetail.findOne({
            where:{user_id : userId}
        })
        if(!user){
            throw new Error("User not found");
        }
        if(!user.ktp_id){
            throw new Error("You need to verify your account with identity card");
        }
        const rent_type = await RentType.findOne({
            where :{id: data.rent_type_id}
        })
        if(!rent_type){
            throw new Error("Rent type not found");
            
        }
        const rent_length = rent_type.rent_period * 30;
        const current_date = new Date();
        const expirationDate = new Date (current_date);
        expirationDate.setDate(expirationDate.getDate() + rent_length);
        const transaction = await RentTransaction.create({
            user_id : userId,
            rent_type_id : data.rent_type_id,
            battery_name : rent_type.capacity,
            expiration_date : expirationDate,
            status: "Waiting Payment",
        })
        if(shipping){
            transaction.shipping_id = shipping.id;
            await transaction.save();
        }
        return transaction;
        
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const rentSummary = async (rent_type_id, userId) =>{
    try {
        let shipping = await ShippingDetail.findOne({
            where:{user_id : userId}
        })
        if(!shipping){
            shipping = {};
        }
        const rent_type = await RentType.findOne({
            where :{id: rent_type_id}
        })
        return {rent_type, shipping}
        
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const getRentTransactionbyId = async (id)=>{
    try {
        let token_verify
        const transaction = await RentTransaction.findOne({
            where :{ id },
            include: [
                {
                    model : Token,
                    attributes : ['token']
                }
            ]
        })
        if(!transaction){
            throw new Error("Data not found");
        }
        if(transaction.status == "Active"){
            token_verify = true
        }else{
            token_verify = false
        }

        const rent_type = await RentType.findOne({
            where :{ id : transaction.rent_type_id}
        })
        return {
            transaction, rent_type, token_verify
        }
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const paidTransaction = async (id) =>{
    try {
        const transaction = await RentTransaction.findOne({
            where:{id}
        })
        if (!transaction){
            throw new Error("Data not found");
        }
        const token_id = await Token.findOne({
            where :{status :'unused'},
            attributes:['id']
        })
        transaction.token_id = token_id.id;
        transaction.payment = "BCA"
        transaction.status = "Paid Off"
        await transaction.save();

        const token = await Token.findOne({
            where :{id : token_id.id},
            attributes:['id', 'token', 'status']
        })

        if(!token){
            throw new Error("Token data not found");
            
        }
        token.status = "used";
        await token.save();
        return token.token;

    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const getSubscriptions = async (userId)=>{
    try {
        const allSubscriptions = await RentTransaction.findAll({
            where: {
                user_id: userId,
                status: {
                  [Op.in]: ["Active", "Paid Off"]
                }
              },
            include: [
              {
                model: RentType,
                attributes: ['price']
              },
              {
                model: Token,
                attributes: ['token']
              }
            ]
          });
          
        if(!allSubscriptions.length){
            allSubscriptions = []
        }
        let activeSubscription = await RentTransaction.findOne({
            where : {user_id : userId, status : "Active"},
            include: [
                {
                    model: RentType,
                    attributes: ['price'], 
                },
                {
                    model : Token,
                    attributes : ['token']
                }
            ]
        })
        if(!activeSubscription){
            activeSubscription = {}
        }

        const transactionDefault = await RentTransaction.findOne({
            where :{user_id : userId, isDefault : true},
            attributes : ['id','rent_type_id', 'battery_name', 'token_id']
        });

        
        const rent_type = await RentType.findOne({
            where : { id : activeSubscription.rent_type_id}
        })
        const subscription = await Subscription.findAll({
            where : {rent_transaction_id : activeSubscription.id}
        })
        const totalSubscription = subscription.length;
        const remainingSubscription = rent_type.rent_period - totalSubscription;

        let remainingTimeInDays = 0;

        if (totalSubscription !==0){
            const expirationDate = subscription[0].expirationDate
            const now = new Date(); // Mengambil waktu sekarang
            // Menghitung sisa waktu dalam milidetik
            const remainingTimeInMillis = expirationDate - now;
            // Jika ingin mengubah ke dalam format yang lebih mudah dibaca (contohnya dalam hari):
            remainingTimeInDays = Math.ceil(remainingTimeInMillis / (1000 * 60 * 60 * 24));
        }

        const subs = {
            totalSubscription : totalSubscription,
            remainingSubscription : remainingSubscription,
            remainingTime : remainingTimeInDays
        }
        if(transactionDefault){
            return {transactionDefault, subs, allSubscriptions}
        }else{
            return {
                activeSubscription, subs, allSubscriptions
             };
        }
        
        
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const userActivity = async (userId) =>{
    try {
        let activity = await RentTransaction.findAll({
            where : {user_id : userId},
            include: [
                {
                    model: Token,
                    attributes: ['token'], 
                }
            ]
        })
        if(!activity.length){
            return activity = {}
        }
        return activity;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const getActiveRental = async (userId) =>{
    try {
        let activeSubscription = await RentTransaction.findAll({
            where : {user_id : userId, status : "Active"},
            include: [
                {
                    model: Token,
                    attributes: ['token'], 
                }
            ]
        })
        if(!activeSubscription.length){
            return activeSubscription = {}
        }
        return activeSubscription
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}


const updateBatteryName = async (data, id) =>{
    try {
        const rent = await RentTransaction.findOne({
            where :{id}
        })
        if(!rent){
            throw new Error("Rental Data Not Found");
        }
        rent.battery_name = data.battery_name;
        await rent.save();
        return rent;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}


const createPaymentMidtrans = async (transaction_id, totalAmount) =>{
    const parameter = {
        transaction_details :{
            order_id : transaction_id,
            gross_amount : totalAmount
        },
        credit_card:{
            secure : true,
        }
    }

    try {
        const response = await midtrans.createTransacction(parameter);
        return response;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const defaultSubscription = async (id, userId) =>{
    try {
        const subscription = await RentTransaction.findOne({
            where : {id : id}
        });
        const defaultSubs = await RentTransaction.findOne({
            where :{ user_id : userId, isDefault : true}
        })
        if (defaultSubs){
            defaultSubs.isDefault = false;
            subscription.isDefault = true;
            defaultSubs.save();
            subscription.save();
        } else{
            subscription.isDefault = true;
            subscription.save();
        }
        const isDefault = await RentTransaction.findOne({
            where :{user_id : userId, isDefault : true}
        })
        return isDefault
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}


export { createRentTransaction, getRentTransactionbyId, paidTransaction, getSubscriptions, getActiveRental, updateBatteryName, rentSummary, createPaymentMidtrans, userActivity, defaultSubscription }
