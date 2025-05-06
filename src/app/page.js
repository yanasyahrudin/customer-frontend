'use client';

import { useEffect, useState } from 'react';
import { getCustomerData, getGenderSummary, getAgeSummary } from '../libs/api';
import AgeChart from '../components/AgeChart'; 
import GenderChart from '../components/GenderChart';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';

export default function SummaryPage() {
  const [data, setData] = useState([]);
  const [genderSummary, setGenderSummary] = useState(null);
  const [ageSummary, setAgeSummary] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getCustomerData(page, limit).then((res) => {
      setData(res.customers);
      setTotal(res.total);
      setLoading(false);
    }).catch((err) => {
      console.error('Error fetching customer data:', err);
      setLoading(false);
    });

    getGenderSummary().then((summary) => {
      setGenderSummary(summary);
    }).catch((err) => {
      console.error('Error fetching gender summary:', err);
    });

    getAgeSummary().then((summary) => {
      setAgeSummary(summary);
    }).catch((err) => {
      console.error('Error fetching age summary:', err);
    });


  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">Customer Summary</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {genderSummary && (
              <div className="w-full md:w-1/2">
                <GenderChart data={genderSummary} />
              </div>
            )}
            {ageSummary && (
              <div className="w-full md:w-1/2">
                <AgeChart data={ageSummary} />
              </div>
            )}
          </div>
          <DataTable data={data} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
