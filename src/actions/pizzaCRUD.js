"use server"

import mongoose from "mongoose"
import connectDB from "@/lib/db"
import { Pizza } from "@/models/pizzas"

// create
export const addPizza = async values => {
    const { nome, prezzo, ingredienti } = values

    const ingredientiObjectIds = ingredienti.map(id => new mongoose.Types.ObjectId(id))

    await connectDB()

    const newPizza = await new Pizza({
        nome,
        prezzo,
        ingredienti: ingredientiObjectIds
    })
    
    try {
        await newPizza.save()
        console.log("newPizza saved")
    } catch (error) {
        console.log(error)
    }
}

// read - vedi app/api

// update
export const updatePizza = async values => {
    const { id, nome, prezzo, ingredienti } = values

    try {
        await Pizza.findByIdAndUpdate(
            id,
            { nome, prezzo, ingredienti },
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
        await Pizza.findByIdAndDelete(id)
        console.log("Pizza deleted")
    } catch (error) {
        console.log(error)
    }
}