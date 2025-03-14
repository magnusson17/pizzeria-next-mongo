"use server"

import connectDB from "@/lib/db"
import { FoodType } from "@/models/foodTypes"

// create
export const addFoodType = async values => {
    const { titoloIt, titoloEn } = values

    await connectDB()

    try {
        const newFoodType = await new FoodType({
            contentType: "foodType",
            titolo: {
                it: titoloIt,
                en: titoloEn,
            }
        })

        await newFoodType.save()
        
        console.log("newFoodType added")
        return { success: true, message: "Nuovo contenuto aggiunto!" }
    } catch (error) {
        // per il back
        console.log(error)
        // per il fron
        if (error.code === 11000) return { success: false, message: "Il titolo della tipologia esiste già, non puoi avere 2 tipologie con lo stesso titolo zio" }
        return { success: false, message: "Si è verificato un problema" }
    }
}

// delete
export const deleteFoodType = async id => {
    await connectDB()

    try {
        await FoodType.findByIdAndDelete(id)
        console.log("FoodType eliminato")
    } catch (error) {
        console.log(error)
    }
}
