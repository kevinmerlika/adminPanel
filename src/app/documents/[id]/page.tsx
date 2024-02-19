"use client"
import React from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Order } from '../../_models/orderexport'; // Adjust the import path based on your project structure
import "../[id]/page.scss"
import axios from 'axios';
import "../../_assets/loading.scss"

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setLoading] = useState(true);

  const [updatedOrder, setUpdatedOrder] = useState<Order | null>(null);
  const isDelivered = updatedOrder && updatedOrder.status === "delivered";

  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
         // Simulate a delay of 2 seconds before fetching data
         await new Promise(resolve => setTimeout(resolve, 500));
        const response = await axios.get<Order>(`http://localhost:3001/documents/order/${id}`);
        setOrder(response.data);
        setLoading(false);
        // Initialize updatedOrder with the fetched order
        setUpdatedOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the corresponding property in updatedOrder
    setUpdatedOrder(prevOrder => ({
      ...prevOrder!,
      shipping_address: {
        ...prevOrder!.shipping_address,
        [name]: value
      }
    }));
  };

  
  

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Update the corresponding property in updatedOrder
    setUpdatedOrder(prevOrder => ({
      ...prevOrder!,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/documents/updateById/${updatedOrder?._id}`, updatedOrder);
      router.push(`/documents`); // Redirect to the order details page after successful update
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Signed");
      router.push(`/pdfviewer/${order?.order_number}`)
      
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };
  return (
    <div className="order-card">
      {updatedOrder ? (
        <form onSubmit={handleSubmit}>
          <h2>Edit Order</h2>
          <div className="order-details">
            <div className="order-info">
              <p>Order Number: {updatedOrder.order_number}</p>
              <p>Customer ID: {updatedOrder.customer_id}</p>
              <p>Total Amount: {updatedOrder.total_amount}</p>
              <p>Order Date: {updatedOrder.order_date}</p>
              <p>Payment Method: {updatedOrder.payment_method}</p>
              <p>
                Status: 
                <select name="status" value={updatedOrder.status} onChange={handleSelectChange} disabled={isDelivered!}>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </p>
            </div>
            <div className="shipping-address">
              <h3>Shipping Address</h3>
              <p>Street: <input type="text" name="street" value={updatedOrder.shipping_address.street} onChange={handleInputChange} disabled={isDelivered!} /></p>
              <p>City: <input type="text" name="city" value={updatedOrder.shipping_address.city} onChange={handleInputChange} disabled={isDelivered!} /></p>
              <p>State: <input type="text" name="state" value={updatedOrder.shipping_address.state} onChange={handleInputChange} disabled={isDelivered!} /></p>
              <p>Postal Code: <input type="text" name="postal_code" value={updatedOrder.shipping_address.postal_code} onChange={handleInputChange} disabled={isDelivered!} /></p>
              <p>Country: <input type="text" name="country" value={updatedOrder.shipping_address.country} onChange={handleInputChange} disabled={isDelivered!} /></p>
            </div>
          </div>
          <button type="submit">Update Order</button>
          {isDelivered && <button onClick={handleSign}>Sign Order</button>}

        </form>
      

      ) : (
        isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )
      )}
    </div>
  );
      }  