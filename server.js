const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = process.env.PORT || 6060;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      businessName,
      businessType,
      address,
      licensed,
      insured,
      ownerName,
    } = req.body;
    //Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    //Create the vendor and business info records with a transaction
    const vendor = await prisma.vendor.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        businessInfo: {
          create: {
            businessName,
            businessType,
            address,
            licensed,
            insured,
            ownerName,
          },
        },
      },
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
