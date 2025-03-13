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