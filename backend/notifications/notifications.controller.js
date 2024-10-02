import { subscriptionNotif, getAllNotifications, getNotificationByID } from "./notifications.service.js";

const subscriptionNotifController = async (req, res) =>{
    const data = req.body;
    const userId = req.user.UserId;
    try {
        const notification = await subscriptionNotif(data, userId);
        return res.status(200).json({
            success : 1,
            message : "Notification successfully posted"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getAllNotificationsController = async (req, res)=>{
    const userId = req.user.UserId;
    try {
        const notifications = await getAllNotifications(userId);
        return res.status(200).json({
            success : 1,
            data : notifications
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const getNotificationByIdController = async (req, res) =>{
    const id = req.params.id
    try {
        const notification = await getNotificationByID (id);
        return res.status(200).json({
            success : 1,
            data : notification
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export { subscriptionNotifController, getAllNotificationsController, getNotificationByIdController }