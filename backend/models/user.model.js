import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+$/, 'Username should not contain spaces']
    },
    profession: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        uppercase: true,
        required: true,
    },
    avatar: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
    },
    followers:{
        type:Array,
        default: [],
    },
    following:{
        type:Array,
        default: [],
    }
}, {timestamps:true});

export const User = mongoose.model('User', userSchema);
