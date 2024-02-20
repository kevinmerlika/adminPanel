import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);


interface PieChartData {
    paymentMethod: string;
    totalAmount: number;
  }
  
  

  const PieChart: React.FC<{ data: PieChartData[] }> = ({ data }) => {
    console.log(data); // To verify data structure

    const chartData = {
        labels: data.map((item) => item.paymentMethod), // Use paymentMethod for labels
        datasets: [
            {
                data: data.map((item) => item.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
