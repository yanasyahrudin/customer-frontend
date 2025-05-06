import clientPromise from "../../../libs/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("customerDB");
    const collection = db.collection("users");

    const currentYear = new Date().getFullYear();

    const pipeline = [
      {
        $addFields: {
          age: { $subtract: [currentYear, "$Age"] }
        }
      },
      {
        $addFields: {
          ageGroup: {
            $switch: {
              branches: [
                { case: { $lt: ["$age", 18] }, then: "0-17" },
                { case: { $and: [{ $gte: ["$age", 18] }, { $lt: ["$age", 26] }] }, then: "18-25" },
                { case: { $and: [{ $gte: ["$age", 26] }, { $lt: ["$age", 36] }] }, then: "26-35" },
                { case: { $and: [{ $gte: ["$age", 36] }, { $lt: ["$age", 46] }] }, then: "36-45" },
                { case: { $and: [{ $gte: ["$age", 46] }, { $lt: ["$age", 61] }] }, then: "46-60" },
              ],
              default: "61+"
            }
          }
        }
      },
      {
        $group: {
          _id: "$ageGroup",
          count: { $sum: 1 }
        }
      }
    ];

    const rawResult = await collection.aggregate(pipeline).toArray();

    const ageGroups = ["0-17", "18-25", "26-35", "36-45", "46-60", "61+"];
    const result = ageGroups.map(group => {
      const found = rawResult.find(item => item._id === group);
      return { ageGroup: group, count: found ? found.count : 0 };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching age summary:", err);
    res.status(500).json({ message: "Error fetching age summary" });
  }
}
