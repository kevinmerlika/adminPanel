// Navbar.tsx
"use client"
import React, {useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next'; 
import './Navbar.scss';
import Child from '../child';
import getTranslations from '../utils/getTranslations';
import Cart from './Cart';


interface NavbarItem {
  id: number;
  label: string;
  url: string;
}

interface NavbarProps {
    locale: string;
  }

  const Navbar: React.FC<NavbarProps> = ({locale}) => {
    const router = usePathname();
    const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);
    const { t } = useTranslation(); // Initialize the useTranslation hook


    console.log(locale);
    

    useEffect(() => {
        const fetchNavbarItems = async () => {
          try {
            // Fetch navbar items from API
            const response = await fetch('http://localhost:3001/navbar');
            if (!response.ok) {
              throw new Error('Failed to fetch navbar items');
            }
            const data: NavbarItem[] = await response.json();
    
            // Load language strings based on the provided locale
            const translations = await getTranslations(locale);
            console.log(translations);
            
    
            // Replace labels with translations
            const translatedNavbarItems = data.map(item => ({
              ...item,
              label: translations[item.label] || item.label // Use translation if available, otherwise fallback to original label
            }));
    
            // Update state with translated navbar items
            setNavbarItems(translatedNavbarItems);
          } catch (error) {
            console.error('Error fetching navbar items:', error);
          }
        };
    
        fetchNavbarItems();
      }, [locale]); // Fetch navbar items whenever locale changes
      
    return (
        <div className='navbar container col-12'>
            <div className='navbar_burger col-4'>
            <Cart locale={locale} />
            </div>
            <div className='navbar__list col-sm-4'>
                <ul className='navbar__list col-11'>
                    {navbarItems.map(item => (
                        <li key={item.id} className={ router === item.url ? 'navbar__list-items--active' : 'navbar__list-items'}>
                            <a className='navbar__list-items' href={item.url}>{t(item.label)}</a>
                        </li>
                    ))}
                </ul>
                <div className='navbar__list col-sm-4'>
                <Child />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default Navbar;