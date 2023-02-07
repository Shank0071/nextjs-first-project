// in next projects you can use fetch in server side codes as well

import { MongoClient } from "mongodb";

async function handler(req, res) {
    console.log(req.method)
    if (req.method === "GET") {  
      const client = await MongoClient.connect(
        "mongodb+srv://sankar:sankar100%25@cluster0.ahiszro.mongodb.net/?retryWrites=true&w=majority"
      );
  
      try {
        const db = client.db("test");
        const meetupsCollection = db.collection("meetups");
        const results = await meetupsCollection.find().toArray();
        console.log(results);
      } finally {
        client.close();
      }  
  
  
  
      res.status(201).json({ message: "Meetups collection got!" });
    }
    return results
  }
  
  export default handler;
  