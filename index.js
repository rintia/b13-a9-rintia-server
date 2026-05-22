const express = require("express");
const dontenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dontenv.config();

const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
    try {
      // await client.connect();
  
      const db = client.db("PetAdoption");
      const petCollection = db.collection("pets");
      const requestCollection = db.collection("requests");
  
      app.get("/featured", async (req, res) => {
        const result = await petCollection.find().limit(4).toArray()
        res.json(result)
      })
  
      app.get("/pets", async (req, res) => {
        const result = await petCollection.find().toArray();
        res.json(result);
      });
  
      app.post("/pets", async (req, res) => {
        const petData = req.body;
        console.log(petData);
        const result = await destinationCollection.insertOne(petData);
  
        res.json(result);
      });
  
      app.get("/pets/:id", async (req, res) => {
        const { id } = req.params;
  
        const result = await petCollection.findOne({
          _id: new ObjectId(id),
        });
  
        res.json(result);
      });
  
      app.patch("/pets/:id", async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        console.log(updatedData);
  
        const result = await petCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData },
        );
  
        res.json(result);
      });
  
      app.delete("/pets/:id", async (req, res) => {
        const { id } = req.params;
        const result = await petCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.json(result);
      });
  
      app.get("/request/:userId", async (req, res) => {
        const { userId } = req.params;
  
        const result = await requestCollection.find({ userId: userId }).toArray();
  
        res.json(result);
      });
  
      app.post("/request", async (req, res) => {
        const requestData = req.body;
        const result = await requestCollection.insertOne(requestData);
  
        res.json(result);
      });
  
      app.delete("/request/:requestId", async (req, res) => {
        const { requestId } = req.params;
        const result = await requestCollection.deleteOne({
          _id: new ObjectId(requestId),
        });
  
        res.json(result);
      });
  
      // await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!",
      );
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);
  

app.get("/", (req, res) => {
    res.send("Server is running fine!");
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });