const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

// body parser middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }) // this is optional
  .then(() => console.log(`Mongo connected on port ${port}`))
  .catch((err) => console.log(err));

// use routes
app.use("/api/items", items);

// Serve static assits if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
