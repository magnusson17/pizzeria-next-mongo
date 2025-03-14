"use server"

import mongoose from "mongoose"
import connectDB from "@/lib/db"
import { Food } from "@/models/foods"

// create
export const addPizza = async values => {

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

    const newPizza = await new Food({
        titolo: {
            it: titoloIt,
            en: titoloEn,
        },
        prezzo,
        ingredienti: ingredientiObjectIds,
        tipologie: tipologieObjectIds,
    })

    console.log(newPizza)
    
    try {
        await newPizza.save()
        console.log("newPizza saved")

        return { success: true, message: "Nuovo contenuto aggiunto!" }
    } catch (error) {
        console.log(error)

        if (error.code === 11000) return { success: false, message: "Errore! Esiste già un contenuto con questo titolo"}
        return { success: false, message: "Errore! Controlla di aver compilato correttamente i campi zio"}
    }
}

// read - vedi app/api

// update
export const updatePizza = async values => {
    const { id, nome, prezzo, ingredienti } = values

    try {
        await Pizza.findByIdAndUpdate(
            id,
            { titolo, prezzo, ingredienti },
            {new: true}
        )
    } catch (error) {
        console.log(error)
    }
}

// delete
export const deletePizza = async id => {
    await connectDB()

    try {
        await Food.findByIdAndDelete(id)
        console.log("Pizza deleted")
    } catch (error) {
        console.log(error)
    }
}