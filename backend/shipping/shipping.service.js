import { ShippingDetail } from "../../models/ShippingDetailModel.js";
import Users from "../../models/UserModel.js";

const createShipping = async (data, userId) =>{
    try {
        
        const results = await ShippingDetail.create({
            user_id:userId,
            name: data.name,
            phone : data.phone,
            street_name : data.street_name,
            village: data.village,
            full_address: data.full_address
        })
        return results;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
};

const editShipping = async (data, id) =>{
    try {
        const shipping = await ShippingDetail.findOne({
            where : {id},
        })
        if(!shipping){
            throw new Error('Data not found');
        }
        shipping.name=  data.name;
        shipping.phone = data.phone;
        shipping.street_name = data.street_name;
        shipping.village =  data.village;
        shipping.full_address= data.full_address;
        await shipping.save();
        return shipping;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
};

const getShipping = async () =>{
    try {
        const results = await ShippingDetail.findAll({
            attributes:['id', 'phone', 'street_name', 'village', 'full_address']
        });
        return results;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const getShippingById = async (id) =>{
    try {
        const result = await ShippingDetail.findOne({
            where: { id }
        });
        if(!result){
            throw new Error('Data not found');
        }
        return result;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const deleteShipping = async (id) =>{
    try {
        const shipping = await ShippingDetail.findOne({
            where :{id},
        })
        if(!shipping){
            throw new Error('Data not found');
        }
        await ShippingDetail.destroy({
            where :{id}
        })
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export { createShipping, editShipping, deleteShipping, getShipping, getShippingById };