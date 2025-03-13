import mongoose from "mongoose"

const drinkSchema = mongoose.Schema({
    titolo: {
        it: {
            type: String,
            required: true
        },
        en: {
            type: String,
            required: true
        },
    },
    prezzo: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const Drink = mongoose.models.Drink || mongoose.model("Drink", drinkSchema)