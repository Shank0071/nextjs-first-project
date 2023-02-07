import { MongoClient } from "mongodb";

// /api/new-meetup

// POST/api/new-meetup

async function handler(req, res) {
  console.log(req.method)
  if (req.method === "POST") {
    const data = req.body;
    console.log(data)

    
    const client = await MongoClient.connect(
      "mongodb+srv://sankar:sankar100%25@cluster0.ahiszro.mongodb.net/?retryWrites=true&w=majority"
    );

    // await mongoose.connect("mongodb+srv://sankar:sankar100%@cluster0.ahiszro.mongodb.net/test?retryWrites=true&w=majority")
    // console.log("database connected")

    try {
      const db = client.db("test");
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);
    } finally {
      client.close();
    }  



    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
