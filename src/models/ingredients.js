import mongoose from "mongoose"

const ingredientSchema = mongoose.Schema({
    nome: {
        it: {
            type: String,
            required: true
        },
        en: {
            type: String,
            required: true
        },
    },
}, { timestamps: true })

export const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema)