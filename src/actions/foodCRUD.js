"use server"

import mongoose from "mongoose"
import connectDB from "@/lib/db"
import { Food } from "@/models/foods"

// create
export const addFood = async values => {

    const {
        titoloIt,
        titoloEn,
        prezzo,
        ingredienti,
        tipologie
    } = values

    const ingredientiObjectIds = ingredienti.map(id => new mongoose.Types.ObjectId(id))
    const tipologieObjectIds = tipologie.map(id => new mongoose.Types.ObjectId(id))

    await connectDB()

    const newFood = await new Food({
        titolo: {
            it: titoloIt,
            en: titoloEn,
        },
        prezzo,
        ingredienti: ingredientiObjectIds,
        tipologie: tipologieObjectIds,
    })

    try {
        await newFood.save()
        console.log("newFood saved")

        return { success: true, message: "Nuovo contenuto aggiunto!" }
    } catch (error) {
        console.log(error)

        if (error.code === 11000) return { success: false, message: "Errore! Esiste già un contenuto con questo titolo" }
        return { success: false, message: "Errore! Controlla di aver compilato correttamente i campi zio" }
    }
}

// read - vedi app/api

// update
export const updateFood = async values => {

    const {
        id,
        titoloIt,
        titoloEn,
        prezzo,
        ingredienti,
        tipologie
    } = values

    await connectDB()

    try {
        await Food.findByIdAndUpdate(
            id,
            {
                titolo: {
                    it: titoloIt,
                    en: titoloEn
                },
                prezzo,
                ingredienti,
                tipologie
            },
            { new: true, runValidators: true  }
        )

        console.log("Food updated")
        return { success: true, message: "Braaaavo zio, hai aggiornato il contenuto"}

    } catch (error) {
        console.log(error)
        return { success: false, message: "erroooooooore, compilali bene sti campi zio"}
    }
}

// delete
export const deleteFood = async id => {
    await connectDB()

    try {
        await Food.findByIdAndDelete(id)
        console.log("Food deleted")
    } catch (error) {
        console.log(error)
    }
}