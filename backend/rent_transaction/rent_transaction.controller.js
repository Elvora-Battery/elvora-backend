import { createRentTransaction, getRentTransactionbyId, paidTransaction, getSubscriptions, getActiveRental, updateBatteryName, rentSummary, createPaymentMidtrans, userActivity, defaultSubscription} from "./rent_transaction.service.js";

const createRentTransactionController = async (req, res) =>{
    const userId = req.user.UserId; 
    const data = req.body;
    try {
        const transaction = await createRentTransaction (data, userId);
        return res.status(200).json({
            success:1,
            data:transaction
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const rentSummaryController = async (req, res) =>{
    const rent_type_id = req.body.rent_type_id;
    const userId = req.user.UserId;
    try {
        const result = await rentSummary(rent_type_id, userId);
        return res.status(200).json({
            success:1,
            data:result
        })
    } catch (error) {
        
    }
}

const getRentTransactionbyIdController = async (req, res)=>{
    const id = req.params.id;
    try {
        const transaction = await getRentTransactionbyId(id);
        return res.status(200).json({
            success:1,
            data:transaction
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const paidTransactionController = async (req, res) =>{
    const transaction_id = req.body.id;
    try {
        const transaction = await paidTransaction(transaction_id);
        return res.status(200).json({
            success:1,
            message: "Rent Transaction successfully paid",
            token:transaction
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getSubscriptionsController = async (req, res)=>{
    const userId = req.user.UserId; 
    try {
        const subscriptions = await getSubscriptions(userId);
        return res.status(200).json({
            success:1,
            data : subscriptions
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getActiveRentalController = async (req, res)=>{
    const userId = req.user.UserId; 
    console.log(userId);
    try {
        const activeRental = await getActiveRental (userId);
        return res.status(200).json({
            success : 1,
            data : activeRental
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const updateBatteryNameController = async (req, res)=>{
    const id = req.params.id;
    const data = req.body;
    try {
        const rent = await updateBatteryName(data, id);
        return res.status(200).json({
            success : 1,
            message : "Battery name has been updated"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
    
}

const createPaymentMidtransController = async (req, res) =>{
    const {transaction_id, totalAmount} = req.body;

    try {
        const paymentRespose = await createPaymentMidtrans(transaction_id, totalAmount);
        res.status(200).json(paymentRespose);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const userActivityController = async (req, res) =>{
    const userId = req.user.UserId; 
    try {
        const activity = await userActivity(userId);
        return res.status(200).json({
            success : 1,
            data : activity
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const defaultSubscriptionController = async (req, res) =>{
    const id = req.body.rent_transaction_id;
    const userId = req.user.UserId;
    try {
        const defaultSubs = await defaultSubscription (id, userId);
        return res.status(200).json({
            success : 1,
            message : "Default subscription successfully changed"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export { createRentTransactionController, getRentTransactionbyIdController, paidTransactionController, getSubscriptionsController, getActiveRentalController, updateBatteryNameController, rentSummaryController, createPaymentMidtransController, userActivityController, defaultSubscriptionController }