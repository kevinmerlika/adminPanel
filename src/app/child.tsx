"use client"
import { useContext } from "react";
import { Context } from "./context";
import { FiGlobe } from 'react-icons/fi'; // Assuming you have imported the necessary icon library

export default function Child() {
    const { language, setLanguage } = useContext(Context);

    const handleChangeLanguage = (event: any) => {
        const newLanguage = event.target.value;
        console.log(`Changing language from ${language} to ${newLanguage}`);
        setLanguage(newLanguage);
    };

    return (
        <main className="container col-2">
            <div>
                <label htmlFor="language-select">Select Language:</label>
                <select id="language-select" value={language} onChange={handleChangeLanguage}>
                    <option value="En">English</option>
                    <option value="Fr">French</option>
                    <option value="Sq">Shqip</option>
                </select>
            </div>
        </main>
    );
}