interface Order {
    _id: string;
    order_number: string;
    customer_id: string;
    shipping_address: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    items: {
      product_id: string;
      quantity: number;
      price: number;
      _id: string;
    }[];
    total_amount: number;
    order_date: string;
    payment_method: string;
    status: string;
    __v: number;
  }
  