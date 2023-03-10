const express = require("express");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const URL = process.env.MONGO_DB_URI;
const PORT = 4000;

const client = new MongoClient(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const connect = async () => {
  await client.connect();
};

const _db = client.db("cipherSchools");
const Videos = _db.collection("videos");

app.post("/videos", async (req, res) => {
  try {
    const newData = req.body;
    await Videos.insertOne(newData);
    res.status(201).json({ status: true, message: "Video added successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});
app.get("/videos", async (req, res) => {
  try {
    const videos = await Videos.find({}).toArray();
    res.status(201).json({ status: true, data: videos });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/videos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const video = await Videos.findOne({ _id: new ObjectId(id) });
    res.status(200).json({ status: true, data: video });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.patch("/videos/:id/view", async (req, res) => {
  const { id } = req.params;

  await Videos.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $inc: { views: 1 } },
    { returnOriginal: false },
    (err, result) => {
      if (err) {
        console.error("Failed to update video views:", err);
        res.status(500).send("Failed to update video views");
        return;
      }

      res.send(result);
    }
  );
});

app.get("/", async (req, res) => {
  res.status(400).json({ message: "hello world running" });
});
app.use("/*", async (req, res) => {
  res.status(400).json({ message: "The Route doesn't exist" });
});

app.listen(PORT, async () => {
  await connect();

  console.log("database connection established");
  console.log(`Server is running on port : ${PORT}`);
});
