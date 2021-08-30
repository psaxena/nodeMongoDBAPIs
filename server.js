const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = "<yourdbUser>";
const pswd = "<yourDBPswd>";
const YOUR_MONGODB_URL = `mongodb+srv://${user}:${pswd}@cluster0.eb2nh.mongodb.net/nodeAppTestDB?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose
  .connect(YOUR_MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

let PORT = 8080;

// ........All routes for service
require("./app/routes/app.routes.js")(app);
// ........

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
