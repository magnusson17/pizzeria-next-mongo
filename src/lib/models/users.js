import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    squadra: {
        type: String,
        required: true
    }
}, {timestamps: true})

// se il modello esiste già su MongoDB, altrimenti creo un nuovo modello
export const User = mongoose.models.User || mongoose.model('User', userSchema);