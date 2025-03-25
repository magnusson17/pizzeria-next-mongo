"use server"

import connectDB from "@/lib/db"
import { Drink } from "@/models/drinks"

// create
export const addDrink = async values => {
    const { titoloIt, titoloEn, prezzo } = values

    await connectDB()

    const newDrink = new Drink({
        titolo: {
            it: titoloIt,
            en: titoloEn,
        },
        prezzo
    })

    try {
        await newDrink.save()
        console.log("newDrink saved")
    } catch (error) {
        console.log(error)
    }
}

// read

// update
export const updateDrink = async values => {
    const {
        id,
        titoloIt,
        titoloEn,
        prezzo
    } = values

    await connectDB()

    try {
        await Drink.findByIdAndUpdate(
            id,
            {
                titolo: {
                    it: titoloIt,
                    en: titoloEn,
                },
                prezzo
            },
            { new: true, runValidators: true }
        )

        return { success: true, message: "Ehhhh ma che bravo!"}
    } catch (error) {
        console.log(error)
        return { success: false, message: "Ziooooo, compilali bene"}
    }
}

// delete
export const deleteDrink = async id => {
    await connectDB()

    try {
        await Drink.findByIdAndDelete(id)
        console.log("Drink deleted")
    } catch (error) {
        console.log(error)
    }
}