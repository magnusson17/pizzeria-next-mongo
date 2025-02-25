import mongoose from "mongoose"

const authUserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

// se il modello esiste già su MongoDB, altrimenti creo un nuovo modello
export const AuthUser = mongoose.models.AuthUser || mongoose.model('AuthUser', authUserSchema)