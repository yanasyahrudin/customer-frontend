import clientPromise from "../../../libs/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("customerDB");
    const collection = db.collection("users");

    const genderSummary = await collection.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } }
    ]).toArray();

    const summary = genderSummary.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.status(200).json(summary);
  } catch (err) {
    console.error("Error fetching gender summary:", err);
    res.status(500).json({ message: "Error fetching gender summary" });
  }
}
