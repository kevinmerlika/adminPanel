// Navbar.tsx
"use client"
import React, {useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';
import './Navbar.scss';
import Child from '../child';

interface NavbarItem {
  id: number;
  label: string;
  url: string;
}

const Navbar: React.FC = () => {
    const router = usePathname();
    const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);

    useEffect(() => {
        // Fetch navbar items from API when the component mounts
        fetch('http://localhost:3001/navbar')
            .then(response => response.json())
            .then(data => {
                setNavbarItems(data);
            })
            .catch(error => {
                console.error('Error fetching navbar items:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div className='navbar container col-12'>
            <div className='navbar__list offset-sm-6'>
                <ul className='navbar__list col-12'>
                    {navbarItems.map(item => (
                        <li key={item.id} className={ router === item.url ? 'navbar__list-items--active' : 'navbar__list-items'}>
                            <a className='navbar__list-items' href={item.url}>{item.label}</a>
                        </li>
                    ))}
                </ul>
                <Child />
            </div>
            <div>
            </div>
        </div>
    );
};

export default Navbar;