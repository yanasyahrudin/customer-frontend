import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenderChart({ data }) {
  if (!data) {
    return <p>Loading...</p>;  // Menampilkan loading jika data belum diterima
  }

  const chartData = {
    labels: Object.keys(data),  // Key adalah gender (misalnya 'male', 'female')
    datasets: [{
      data: Object.values(data),  // Value adalah jumlah untuk setiap gender
      backgroundColor: ['#3b82f6', '#f43f5e'],  // Warna chart untuk masing-masing gender
    }]
  };

  return (
    <div className="flex flex-col items-center bg-yellow-500 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Gender Group Distribution</h2>
      <div className="w-48 h-48"> 
        <Pie data={chartData} />
      </div>
    </div>
  );    
}
