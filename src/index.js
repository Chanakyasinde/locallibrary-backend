require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.send("OK")
})

app.post("/api/v1/genres", async (req, res) => {
    const body = req.body;
    let genre = await prisma.genre.create({
        data: {
            name: body.name
        }
    })
    res.status(201).json(genre);
})

app.get("/api/v1/genres", async (req, res) => {
  const genres = await prisma.genre.findMany();
  return res.status(200).json(genres);
})

app.get("/api/v1/genres/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const genre = await prisma.genre.findUnique({
    where: {
      id
    }
  })

  if (!genre) {
    return res.status(404).json({ error: "Genre with the given id does not exist" })
  }
  res.status(200).json(genre);
})

app.patch("/api/v1/genres/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.genre.update({
    where: {
      id
    },
    data: req.body
  })

  return res.status(200).send("OK");
})

app.listen(3001, (req, res) => {
    console.log("Server started on port 3001");
})