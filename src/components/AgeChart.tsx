import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AgeChart({ data}) {

  if (!data) {
    return <p>Loading...</p>;
  }

  const chartData = {
    labels: data.map(item => item.ageGroup),
    datasets: [{
      data: data.map(item => item.count),
      backgroundColor: [
        '#fde68a', // 0-17
        '#a5f3fc', // 18-25
        '#86efac', // 26-35
        '#93c5fd', // 36-45
        '#c4b5fd', // 46-60
        '#fda4af'  // 61+
      ]
    }]
  };

  return (
    <div className="flex flex-col items-center bg-blue-500 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Age Group Distribution</h2>
      <div className="w-64 h-64">
        <Pie data={chartData} />
      </div>
    </div>
  );
}
