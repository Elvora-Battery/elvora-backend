import { RentType } from "../../models/RentTypeModel.js";
import RentTransaction from "../../models/RentTransactionModel.js";
import Users from "../../models/UserModel.js";
import { ShippingDetail } from "../../models/ShippingDetailModel.js";
import Battery from "../../models/BatteryModel.js";
import { Token } from "../../models/TokenModel.js";
import { all } from "axios";

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
        const shipping = await ShippingDetail.findOne({
            where:{user_id : userId}
        })
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
        const transaction = await RentTransaction.findOne({
            where :{ id }
        })
        if(!transaction){
            throw new Error("Data not found");
        }
        const token = await RentTransaction.findOne({
            where :{ id : transaction.token_id}
        })
        if(token){
            const token_data = token.token;
        }
        const rent_type = await RentType.findOne({
            where :{ id : transaction.rent_type_id}
        })
        const user = await Users.findOne({
            where :{ id: transaction.user_id},
            attributes:['id', 'email', 'name', 'phone', 'ktp_id']
        })
        const shipping = await ShippingDetail.findOne({
            where :{ id : transaction.shipping_id}
        })
        return {
            transaction, user, rent_type, shipping
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
        const allSubsriptions = await RentTransaction.findAll({
            where :{user_id : userId},
            include: [
                {
                    model: RentType,
                    attributes: ['price'], 
                }
            ]
        })
        if(!allSubsriptions.length){
            return res.status(400).json({ message: "There is no subscription" });
        }
        const activeSubscription = await RentTransaction.findOne({
            where : {user_id : userId, status : "Active"},
            include: [
                {
                    model: RentType,
                    attributes: ['price'], // Ambil hanya kolom 'price'
                }
            ]
        })
        if(!activeSubscription){
            return res.status(400).json({ message: "There is no active subscription" });
        }
        
        return {
            activeSubscription, allSubsriptions
        };
        
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const getActiveRental = async (userId) =>{
    try {
        const activeSubsciption = await RentTransaction.findOne({
            where : {user_id : userId, status : "Active"}
        })
        if(!activeSubsciption){
            throw new Error("There is no active subscription");
            
        }
        return activeSubsciption
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

export { createRentTransaction, getRentTransactionbyId, paidTransaction, getSubscriptions, getActiveRental, updateBatteryName, rentSummary }
