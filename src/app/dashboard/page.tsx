"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react'
import "./card.scss"

// Card component to display data
const Card: React.FC<{ title: string, value: number }> = ({ title, value }) => (

  <div className ="card">
    <div className="img-section">               
  </div>
   <div className="card-desc">

  <div className="card-header">

  <div className="card-menu">

  <div className="dot"></div>

  <div className="dot"></div>

    <div className="dot"></div>

    </div>

  </div>
  <div className="card-time">{title} </div>
  <p className="recent">{value} </p>
</div>
  </div>
);

interface DataItem {
  key: string;
  value: number | null;
}

export default function Page() {
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/documents/total`);
        setData(Object.entries(response.data).map(([key, value]) => ({ key, value: value as number | null })));
      } catch (error: any) {
        setError(error.response?.data?.message || 'An error occurred while fetching data');
      }
    };

    fetchData(); // Fetch data immediately when the component mounts

    // Fetch data every 30 seconds after the initial fetch
    const intervalId = setInterval(fetchData, 30000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      {error && <div>Error: {error}</div>}
      {data.length > 0 && (
        <div className="card-container">
          {data.map(({ key, value }) => (
            <Card key={key} title={key.toUpperCase()} value={value!} />
          ))}
        </div>
      )}
    </main>
  );
}