import mongoose, { Schema, Document } from 'mongoose'

export interface IMovie extends Document {
    title : string
    desc : string
    duration : number
    genre : string
    language : string
    releaseDate : Date
    poster : string
}

const movieSchema : Schema = new Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
    language : {
        type : String,
        required : true
    },
    releaseDate : {
        type : Date,
        required : true
    },
    poster : {
        type : String,
        required : true
    }
}, { timestamps : true })

export const movieModel = mongoose.model<IMovie>("movies", movieSchema)