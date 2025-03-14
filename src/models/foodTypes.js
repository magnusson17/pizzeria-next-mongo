import mongoose from "mongoose"

const foodTypeSchema = mongoose.Schema({
    titolo: {
        it: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
    }
}, { timestamps: true })

foodTypeSchema.index({ "titolo.it": 1, "titolo.en": 1 }, { unique: true })

export const FoodType = mongoose.models.FoodType || mongoose.model("FoodType", foodTypeSchema)