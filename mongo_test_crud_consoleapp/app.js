const express = require("express");
const cors  = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");  // Correct import for ObjectId
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Render form for Create operation
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.use(cors());
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
