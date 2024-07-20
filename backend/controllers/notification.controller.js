import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";

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