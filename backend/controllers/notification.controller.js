import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";

//Get notifications
export const getNotifications = async(req, res) =>{
    try {
        const id = req.userId;

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        }
        
        const notifications = await Notification.find({to: user._id}).populate({
            path: "from",
            select:"username createdAt"
        })
        .sort({createdAt: -1})
        return res.status(200).json({
            message:"Got all notifications",
            success:true,
            notifications
        })
    } catch (error) {
        console.log("getNotifications error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//Delete notifications
export const deleteNotifications = async (req, res) => {
    try {
        const id = req.userId;

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        }

        await Notification.deleteMany({to: user._id});

        return res.status(200).json({
            message:"Deleted all notifications",
            success:true,
        })

    } catch (error) {
        console.log("deleteNotifications error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//Delete notification
export const deleteNotification = async (req, res) => {
    try {
        const {id} = req.params
        const notification = await Notification.findById(id);

        if(!notification){
            return res.status(404).json({
                message: "Notification not found",
                success:false
            })
        }

        await Notification.deleteMany(id);

        return res.status(200).json({
            message:"Notification Deleted",
            success:true,
        })

    } catch (error) {
        console.log("deleteNotifications error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}
