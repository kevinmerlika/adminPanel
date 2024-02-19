"use Client"
import React from 'react'
import { useState } from 'react';
import "../_components/Cart.scss"


interface NavbarProps {
    locale: string;
  }

  const Cart: React.FC<NavbarProps> = ({locale}) => {
    console.log(locale);
    const [open, setOpen] = useState(false); 

    const handleClick = () => {
        setOpen(!open);
      };

  return (
    <div className='cart col-2' onClick={handleClick}>
         <span className={open ? "line line-1 open" : "line line-1"}></span>
          <span className={open ? "line line-2 open" : "line line-2"}></span>
          <span className={open ? "line line-3 open" : "line line-3"}></span>
        </div>
  )
}

export default Cart;