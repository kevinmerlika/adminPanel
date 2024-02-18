"use client"
import Navbar from './_components/Navbar';
import "./_styles/grid.css"
import { Inter } from 'next/font/google'
import { Context } from "./context";
import { useState, useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    // Initialize language state with the value from local storage, or default to 'fr'
    const [language, setLanguage] = useState(() => {
      const storedLanguage = localStorage.getItem('language');
      return storedLanguage ? storedLanguage : 'fr';
    });
  
    // Update local storage when language changes
    useEffect(() => {
      localStorage.setItem('language', language);
    }, [language]);
  
    const value = {
      language,
      setLanguage
    };
  return (
    <Context.Provider value={value}>
    <html lang={language}>
      <body>
      <Navbar />
        {children}</body>
    </html>
    </Context.Provider>
  )
}
  

