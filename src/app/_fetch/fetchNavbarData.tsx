import axios from 'axios';

// Define the interface for Navbar items
export interface NavbarItem {
  id: number;
  label: string;
  url: string;
}

// Function to fetch navbar data from an API
const fetchNavbarData = async (): Promise<NavbarItem[]> => {
  try {
    const response = await axios.get<NavbarItem[]>('http://localhost:3001/navbar');
    return response.data; // Return the data fetched from the API
  } catch (error) {
    console.error('Error fetching navbar data:', error);
    return []; // Return an empty array in case of error
  }
};

export default fetchNavbarData;
