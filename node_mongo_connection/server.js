const express = require("express");
const cors = require('cors');

const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");  // Correct import for ObjectId
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To handle JSON requests

let corsOptions = {
    origin : ['*'],
 }

 app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));


// MongoDB connection string
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToDB() {
  await client.connect();
  const myDB = client.db("studentdb");
  const myColl = myDB.collection("students");
  return myColl;
}

// Read: Display all students
app.get("/students", async (req, res) => {
  const myColl = await connectToDB();
  const students = await myColl.find().toArray();
  res.json(students);
});

// Create: Handle form submission to add a student
app.post("/student", async (req, res) => {
  const { name, shape } = req.body;

  const myColl = await connectToDB();
  const doc = { name, shape };
  const result = await myColl.insertOne(doc);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  res.send(`Document inserted successfully with ID: ${result.insertedId}`);
});


// Update: Handle updating student data
app.put("/student/:id", async (req, res) => {
  const { id } = req.params;
  const { name, shape } = req.body;

  const myColl = await connectToDB();
  const result = await myColl.updateOne(
    { _id: new ObjectId(id) },  // Correct way to use ObjectId
    { $set: { name, shape } }
  );

  if (result.modifiedCount > 0) {
    res.send(`Student with ID ${id} updated successfully.`);
  } else {
    res.status(404).send("Student not found or no changes made.");
  }
});

// Delete: Handle deleting a student
app.delete("/student/:id", async (req, res) => {
  const { id } = req.params;

  const myColl = await connectToDB();
  const result = await myColl.deleteOne({ _id: new ObjectId(id) });  // Correct way to use ObjectId

  if (result.deletedCount > 0) {
    res.send(`Student with ID ${id} deleted successfully.`);
  } else {
    res.status(404).send("Student not found.");
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
