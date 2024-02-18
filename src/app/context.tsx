"use client"
import { createContext } from "react"

export const Context = createContext({
    language: "fr",
    setLanguage: function (value:any){
        return value
    }
})