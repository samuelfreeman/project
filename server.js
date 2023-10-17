const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = process.env.PORT || 6060;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, ph_Number } = req.body;
    const vendor = await prisma.vendor.create({
      data: { name, email, ph_Number },
    });
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to register vendor !.` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
