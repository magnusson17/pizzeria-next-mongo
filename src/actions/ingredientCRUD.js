"use server"

import connectDB from "@/lib/db"
import { Ingredient } from "@/models/ingredients"

export const addIngredient = async values => {
    const { nome } = values

    await connectDB()

    const newIngredient = new Ingredient ({
        nome
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