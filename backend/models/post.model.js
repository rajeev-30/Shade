import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    text:{
        type: String,
        default:''
    },
    img:{
        type: String,
        default:''
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    saves:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            default:[]
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required:true
            },
        }
    ]
},{timestamps: true})

export const Post = mongoose.model('Post', postSchema);