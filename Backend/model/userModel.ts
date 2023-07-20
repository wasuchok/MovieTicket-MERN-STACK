import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    username : string
    email : string
    password : string
    isAdmin : boolean
    createdAt: Date
    updatedAt: Date
}

const userSchema : Schema = new Schema({
    username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique: true
    },

    password : {
        type : String,
        required : true
    },

    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    }

    

}, { timestamps: true })

export const userModel = mongoose.model<IUser>("User", userSchema)