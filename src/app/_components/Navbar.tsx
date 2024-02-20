// Navbar.tsx
"use client"
import React, {useState, useEffect} from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
    const routerto = useRouter();
    const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);
    const { t } = useTranslation(); // Initialize the useTranslation hook

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);


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
      

      // Function to handle search query change
    const handleSearchChange = (event: any) => {
        const query = event.target.value;
        setSearchQuery(query);
        // Fetch suggestions based on the query
        fetchSuggestions(query);
    };

     // Function to fetch suggestions based on the query
     const fetchSuggestions = async (query: String) => {
        // Perform API call to fetch suggestions based on the query
        // For example:
        // const response = await fetch(`/api/suggestions?query=${query}`);
        // const data = await response.json();
        // setSuggestions(data.suggestions);
        // Dummy example:
        const dummySuggestions = navbarItems
        .filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
        .map(item => item.label); // Extract label property
    setSuggestions(dummySuggestions);
        setSuggestions(dummySuggestions);
    };

    const handleNavigation = (item: String) => {
        routerto.push(`/${item.toLowerCase()}`);
        setSearchQuery('')
    };

    return (
        <div className='navbar container col-12'>
            <div className='navbar_burger col-1'>
            <Cart locale={locale} />
            </div>
            <div className='navbar__list col-3'>
                <input className='navbar__search col-12'
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {/* Display suggestions */}
                {searchQuery && suggestions.length > 0 && (
                    <ul className="dropdown">
                        {suggestions.map((item, index) => (
                            <li key={index} onClick={() => handleNavigation(item)}>
                            <a href={`/${item.toLowerCase()}`}>{`/${item}`}</a>
                        </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='navbar__list col-sm-8'>
                <ul className='navbar__list col-7'>
                    {navbarItems.map(item => (
                        <li key={item.id} className={ router === item.url ? 'navbar__list-items--active' : 'navbar__list-items'}>
                            <a className='navbar__list-items' href={item.url}>{t(item.label)}</a>
                        </li>
                    ))}
                </ul>
                <div className='navbar__list col-sm-3'>
                <Child />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default Navbar;