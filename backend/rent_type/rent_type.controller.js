import { createRentType, getRentType, getRentTypebyId, updateRentType, deleteRentType } from "./rent_type.service.js";

const createRentTypeController = async (req, res)=>{
    const { rent_period, capacity, price } = req.body;
    try {
        await createRentType (rent_period, capacity, price);
        return res.status(200).json({
            success:1,
            message:"New rent type has been created",
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const getRentTypeController = async (req, res)=>{
    try {
        const results = await getRentType ();
        return res.status(200).json({
            success:1,
            data:results,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getRentTypebyIdController = async (req, res)=>{
    const id = req.params.id;
    try {
        const result = await getRentTypebyId (id);
        return res.status(200).json({
            success:1,
            data:result,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const updateRentTypeController = async (req, res)=>{
    const id = req.params.id;
    const { rent_period, capacity, price } = req.body;
    try {
        const result = await updateRentType (rent_period, capacity, price, id);
        return res.status(200).json({
            success:1,
            data:result,
            message:"Data successfully updated"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const deleteRentTypeController = async (req, res)=>{
    const id = req.params.id;
    try {
        await deleteRentType (id);
        return res.status(200).json({
            success:1,
            message:"Data successfully deleted"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export { createRentTypeController, getRentTypeController, getRentTypebyIdController, updateRentTypeController, deleteRentTypeController };
