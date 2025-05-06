export async function getCustomerData(page = 1, limit = 20) {
  const res = await fetch(`/api/customers?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getGenderSummary() {
  const res = await fetch('/api/customers/gender');
  if (!res.ok) throw new Error("Failed to fetch gender summary");
  return res.json();
}

export async function getAgeSummary() {
  const res = await fetch('/api/customers/age');
  if (!res.ok) { throw new Error('Failed to fetch age summary') };
  return res.json();
}

