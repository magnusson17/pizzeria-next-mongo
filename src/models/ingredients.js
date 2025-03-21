import mongoose from "mongoose"

const ingredientSchema = mongoose.Schema({
    titolo: {
        it: {
            type: String,
            required: true,
            unique: true
        },
        en: {
            type: String,
            required: true,
            unique: true
        },
    },
}, { timestamps: true })

export const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema)