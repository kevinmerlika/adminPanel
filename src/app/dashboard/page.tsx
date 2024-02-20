"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react'
import PieChart from '../_components/PieChart'; // Import your PieChart component
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

interface PieChartData {
  paymentMethod: string;
  totalAmount: number;
}



export default function Page() {
  const [data, setData] = useState<DataItem[]>([]);
const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch total data
      const totalResponse = await axios.get(`http://localhost:3001/documents/total`);
      const totalData = Object.entries(totalResponse.data).map(([key, value]) => ({ key, value: value as number | null }));
      setData(totalData);

      // Fetch pie chart data
      const pieResponse = await axios.get<PieChartData[]>(`http://localhost:3001/documents/pieChart`);
      const pieData = pieResponse.data;
      console.log(pieData);

      setPieChartData(pieData);
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
       {pieChartData.length > 0 && (
    <div className="pie-chart-container col-12">
      <div className="col-4">
      <PieChart  data={pieChartData} />
      </div>
      <div className="col-4">
      <PieChart  data={pieChartData} />
      </div>
      <div className="col-4">
      <PieChart  data={pieChartData} />
      </div>
    </div>
  )}
    </main>
  );
}