const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8000;

app.listen(port, () => {
  console.log("Server is running on port -", port);
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.send(users);
  } catch {
    res.status(500).json({ error: "Same mail id" });
  }
});

app.post("/create_user", async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.send(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong while creating the user" });
  }
});

// async function main() {
//   const allUsers = await prisma.user.findMany({});
//   console.log(allUsers);
// }

// main();
