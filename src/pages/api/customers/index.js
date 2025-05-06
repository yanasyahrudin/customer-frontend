import clientPromise from "../../../libs/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("customerDB");
    const collection = db.collection("users");

    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 20;
    const skip = (page - 1) * limit;

    const [customers, total] = await Promise.all([
      collection.find({}).skip(skip).limit(limit).toArray(),
      collection.countDocuments()
    ]);

    res.status(200).json({ customers, total, page, limit });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error fetching customers" });
  }
}
