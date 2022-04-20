const express = require("express");
const cors = require("cors");
const { use } = require("express/lib/router");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello from my SERVER");
});

const users = [
  { id: 1, name: "Usain Boult", email: "usain@boult.com" },
  { id: 2, name: "Karim Benzema", email: "karim@benzema.com" },
  { id: 3, name: "Lionel Messi", email: "lionel@messi.com" },
];

app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    const matched = users.filter((u) => u.name.toLowerCase().includes(search));
    res.send(matched);
  } else {
    res.send(users);
  }
});

app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id == id);
  console.log(req.params);
  res.send(user);
});

app.post("/user", (req, res) => {
  console.log("request: ", req.body);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});
app.listen(port, () => {
  console.log("Port is: ", port);
});
