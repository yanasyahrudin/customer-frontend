export default function DataTable({ data }) {
  console.log(data, ' test data table');

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-green-500 p-4">
      <h2 className="text-white text-xl font-bold mb-4 text-center">
        Customer Detail Information
      </h2>
      <table className="table-auto w-full text-left border border-gray-300 text-sm min-w-[800px]">
        <thead className="text-white">
          <tr>
            <th className="p-2 border">Number</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Brand Device</th>
            <th className="p-2 border">Digital Interest</th>
            <th className="p-2 border">Location Type</th>
            <th className="p-2 border">Location Name</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Login Hour</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cust) => (
            <tr key={cust._id}>
              <td className="p-2 border">{cust.Number}</td>
              <td className="p-2 border">{cust.Name}</td>
              <td className="p-2 border">{cust.gender}</td>
              <td className="p-2 border">{new Date().getFullYear() - Number(cust.Age)}</td>
              <td className="p-2 border">{cust.Email}</td>
              <td className="p-2 border">{cust["No Telp"]}</td>
              <td className="p-2 border">{cust["Brand Device"]}</td>
              <td className="p-2 border">{cust["Digital Interest"]}</td>
              <td className="p-2 border">{cust["Location Type"]}</td>
              <td className="p-2 border">{cust["Name of Location"]}</td>
              <td className="p-2 border">{cust.Date}</td>
              <td className="p-2 border">{cust["Login Hour"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
