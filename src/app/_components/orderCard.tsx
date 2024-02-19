import React from 'react';
import "./orderCard.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  order: Order;
}



const OrderCard: React.FC<Props> = ({ order }) => {

    const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); // Toggle the value of isFlipped state
  };

    return (
        <div className={`card col-2 ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className='cardcontainer col-12'>
          <div className='content'>
            <div className='front'>
              <h2>Order Number: {order.order_number}</h2>
              <p>Customer ID: {order.customer_id}</p>
              <p>Total Amount: {order.total_amount}</p>
              <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
              <p>Payment Method: {order.payment_method}</p>
              <p>Status: {order.status}</p>
            </div>
            <div className='back'>
              <p>Shipping Address: {order.shipping_address.street}, {order.shipping_address.city}, {order.shipping_address.state}, {order.shipping_address.postal_code}, {order.shipping_address.country}</p>
              <Link className='card__link-container' href={`/documents/${order.order_number}`}><FontAwesomeIcon className='card__link' icon={faLink}/>
              </Link>

            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderCard;
