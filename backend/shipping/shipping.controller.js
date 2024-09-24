import { createShipping, editShipping, deleteShipping, getShipping, getShippingById} from "./shipping.service.js";

const createShippingController = async (req,res)=>{
    const userId = req.user.UserId; 
    const data = req.body;
    try {
        await createShipping (data, userId);
        return res.status(200).json({
            success:1,
            message:"New shipping address has been added",
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const editShippingController = async (req, res)=>{
    const data = req.body;
    const id = req.params.id;
    try {
        const result = await editShipping(data, id);
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
}

const getShippingController = async(req, res)=>{
    try {
        const results = await getShipping();
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

const getShippingByIdController = async (req, res) =>{
    const id = req.params.id;
    try {
        const result = await getShippingById(id);
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

const deleteShippingController = async (req,res)=>{
    const id = req.params.id;
    try {
        await deleteShipping (id);
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

export {createShippingController, editShippingController, deleteShippingController, getShippingController, getShippingByIdController};