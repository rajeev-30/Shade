import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    commentText: {
        type: String,
    },
    type: {
        type: String,
        enum: ['like', 'follow', 'comment'],
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

export const Notification = mongoose.model('Notification', notificationSchema);