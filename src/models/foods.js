import mongoose from "mongoose"
import Ingredient from './ingredients'
import FoodType from './foodTypes'

const foodSchema = mongoose.Schema({
    titolo: {
        it: {
            type: String,
            required: true
        },
        en: {
            type: String,
            required: true
        }
    },
    prezzo: {
        type: Number,
        required: true
    },
    ingredienti: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient'
        }],
        validate: {
            validator: arr => arr.length > 0,
            message: "At least one ingredient is required."
        }
    },
    tipologie: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodType'
        }],
        validate: {
            validator: arr => arr.length > 0,
            message: "At least one food type is required."
        }
    }
}, { timestamps: true })

foodSchema.index({ "titolo.it": 1, "titolo.en": 1 }, { unique: true })

export const Food = mongoose.models.Food || mongoose.model('Food', foodSchema)