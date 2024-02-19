"use client"
import React, { useEffect, useState } from 'react';
import OrderCard from '../_components/orderCard';
import axios from 'axios';
import NewDocumentModal from './NewDocumentModal'; // Import the modal component
import "./page.scss"


function Page() {
    
    const [showModal, setShowModal] = useState(false);

    const [orders, setOrders] = useState<Order[]>([]); // Specify Order[] as the type for useState

    const handleCreateDocument = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<Order[]>('http://localhost:3001/documents', {
                    userId: '1'
                });
                console.log('Response:', response.data);
                setOrders(response.data); // Set the orders state with response.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className='cardcontainer col-12'>
        <div className='cards col-12'>
            {/* Map over the orders array and render OrderCard for each order */}
            {orders.map(order => (
                <OrderCard key={order._id} order={order} />
            ))}
        </div>
         {/* Plus button for creating a new document */}
         <button className="plus-button" onClick={handleCreateDocument}>+</button>
            {/* NewDocumentModal */}
            <NewDocumentModal show={showModal} onHide={handleCloseModal} />
        </main>
        
    );
}

export default Page;
