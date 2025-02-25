import mongoose from "mongoose"

const pizzaSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    prezzo: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Pizza = mongoose.models.Pizza || mongoose.model('Pizza', pizzaSchema)