const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;
let id = 1;

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { name, password } = req.body;
  const newUser = { id, name, password };
  id++;

  fs.readFile("./userData.json", "utf8", (err, data) => {
    if (err) {
      data = "[]";
    }
    let userData = JSON.parse(data);
    userData.push(newUser);

    fs.writeFile("./userData.json", JSON.stringify(userData), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Error saving user data");
      } else {
        console.log("New user signed up:", newUser);
        res.send("User input saved to file");
      }
    });
  });
});

app.get("/data", (req, res) => {
  try {
    const data = fs.readFileSync("./userData.json", "utf8");
    if (data.trim() === "") {
      throw new Error("File is empty");
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading or parsing data");
  }
});

app.listen(port, () => {
  console.log("APPLICATION STARTED!!");
});
