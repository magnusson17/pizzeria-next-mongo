"use server"

import connectDB from "@/lib/db";
import { Pizza } from "@/models/pizzas"

export const addPizza = async (values) => {
    const {nome, prezzo} = values

    await connectDB();

    const newPizza = new Pizza({
        nome, 
        prezzo
    })
    console.log(newPizza)
    
    try {
        await newPizza.save()
        console.log("newPizza saved")
    } catch(error) {
        console.log(error)
    }
}