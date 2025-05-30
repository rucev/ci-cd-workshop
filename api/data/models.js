import { Schema, model } from 'mongoose'

const user = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

})

export const User = model('User', user);