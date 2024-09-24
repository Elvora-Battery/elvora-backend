import { RentType } from "../../models/RentTypeModel.js";

const createRentType = async (rent_period, capacity, price) =>{
    try {
        const results = await RentType.create({
            rent_period : rent_period,
            capacity : capacity,
            price : price,
        })
        return results;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
};

const getRentType = async() =>{
    try {
        const results = await RentType.findAll({
            attributes:['id', 'rent_period', 'capacity', 'price']
        });
        return results;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const getRentTypebyId = async (id)=>{
    try {
        const result = await RentType.findOne({
            where: { id }
        });
        if(!result){
            throw new Error("Data not found");  
        }
        return result;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const updateRentType = async (rent_period, capacity, price, id) =>{
    try {
        const rent_type = await RentType.findOne({
            where: {id},
        });
        if(!rent_type){
            throw new Error('Data not found');
        }
        rent_type.rent_period = rent_period;
        rent_type.capacity = capacity;
        rent_type.price = price;
        await rent_type.save();
        return rent_type;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

const deleteRentType = async (id)=>{
    try {
        const rent_type = await RentType.findOne({
            where: {id},
           });
        if(!rent_type){
            throw new Error('Data not found');
        }
        await RentType.destroy({
            where :{id}
        })
        
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export { createRentType, getRentType, getRentTypebyId, updateRentType, deleteRentType };