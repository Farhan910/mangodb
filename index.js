const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "John", email: "Developer@gmail.com" },
  { id: 2, name: "market", email: "Designer@gmail.com" },
  { id: 3, name: "Robert", email: "Driver@gmail.com" },
  { id: 4, name: "micel", email: "Manager@gmail.com" },
];

// dbuser1
// bBnGJmKRVhIVkSGQ

// knwEA87WhAGxXrqa
// dbuser2

// const uri = "mongodb+srv://dbuser1:bBnGJmKRVhIVkSGQ@cluster0.vwx9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

const uri =
  "mongodb+srv://dbuser1:bBnGJmKRVhIVkSGQ@cluster0.oi7dq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("users");
    // create a document to insert
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log(newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! how are you?");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log("listening to port", port);
});
