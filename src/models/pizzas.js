import mongoose from "mongoose"
import Ingredient from './ingredients'

const pizzaSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    prezzo: {
        type: Number,
        required: true
    },
    ingredienti: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    }]
}, { timestamps: true })

export const Pizza = mongoose.models.Pizza || mongoose.model('Pizza', pizzaSchema)