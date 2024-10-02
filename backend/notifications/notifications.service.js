import { Notification } from "../../models/NotificationModel.js";
import RentTransaction from "../../models/RentTransactionModel.js";
import Users from "../../models/UserModel.js";

const subscriptionNotif = async (data, userId) =>{
    try {
        const notification = await Notification.create({
            title : data.title,
            content : data.content,
            rent_transaction_id : data.rent_transaction_id,
            label : data.label,
            user_id : userId
        })
        return notification;
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const getAllNotifications = async (userId)=>{
    try {
        const notifications = await Notification.findAll({
            where :{ user_id : userId}
        });
        return notifications
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

const getNotificationByID = async (id) =>{
    try {
        const notification = await Notification.findOne({
            where :{id : id}
        })
        if(!notification){
            throw new Error("Data not found");
            
        }
        return notification
    } catch (error) {
        console.error(error.message); // Log error for debugging
        throw error;
    }
}

export { subscriptionNotif, getAllNotifications, getNotificationByID }