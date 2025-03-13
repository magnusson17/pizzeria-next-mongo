"use server"

import connectDB from "@/lib/db"
import { Ingredient } from "@/models/ingredients"

export const addIngredient = async values => {
    const { it, en } = values

    await connectDB()

    const newIngredient = new Ingredient ({
        nome: { it, en }
    })

    try {
        await newIngredient.save()
        console.log("newIngredient saved")
    } catch (error) {
        console.log(error)
    }
}

export const deleteIngredient = async id => {
    await connectDB()

    try {
        await Ingredient.findByIdAndDelete(id)
        console.log("Ingredient deleted")
    } catch (error) {
        console.log(error)
    }
}