const express = require("express");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
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
const Comments = _db.collection("comments");
const Reply = _db.collection("replies");
const Notification = _db.collection("notifications");

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

//comments
app.post("/comments", async (req, res) => {
  try {
    const newData = req.body;
    await Comments.insertOne(newData);
    res
      .status(201)
      .json({ status: true, message: "comment added successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comments.find({}).toArray();
    res.status(201).json({ status: true, data: comments });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.post("/reply", async (req, res) => {
  try {
    const newData = req.body;
    await Reply.insertOne(newData);
    res.status(201).json({ status: true, message: "Reply added successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/reply", async (req, res) => {
  try {
    const comments = await Reply.find({}).toArray();
    res.status(201).json({ status: true, data: comments });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

//likes update
app.post("/videos/:id/like", (req, res) => {
  const videoId = req.params.id;
  const userId = req.body.userId;

  // assuming you're sending the user ID in the request body
  // add the user ID to the "likedBy" array in the post document
  Videos.updateOne(
    { _id: new ObjectId(videoId) },
    { $addToSet: { likes: userId } },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ message: "video liked!" });
        res.send(result);
      }
    }
  );
});

app.post("/videos/:id/dislike", (req, res) => {
  const videoId = req.params.id;
  const userId = req.body.userId;
  console.log(videoId, userId);
  // assuming you're sending the user ID in the request body
  // remove the user ID from the "likedBy" array in the post document
  Videos.updateOne(
    { _id: new ObjectId(videoId) },
    { $pull: { likes: userId } },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ message: "Video disliked!" });
        res.send(result);
      }
    }
  );
});

//notification

app.post("/notifications", async (req, res) => {
  try {
    const newData = req.body;
    await Notification.insertOne(newData);
    res
      .status(201)
      .json({ status: true, message: "notification added successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/notifications/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.params.userId,
    }).toArray();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/", async (req, res) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("new-notification", (data) => {
      console.log("New notification received:", data);
      socket.broadcast.emit("notification", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
  res.status(400).json({ message: "hello world running" });
});
app.use("/*", async (req, res) => {
  res.status(400).json({ message: "The Route doesn't exist" });
});

server.listen(PORT, async () => {
  await connect();

  console.log("database connection established");
  console.log(`Server is running on port : ${PORT}`);
});
