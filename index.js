import express from "express";
import { PrismaClient } from "@prisma/client";
import checkAdmin from "./midleware/admin.js";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/getpost", async (req, res) => {
  try {
    const post = await prisma.post.findMany();
    res.status(200).json({ data: post });
  } catch (error) {
    new Error(error);
  }
});

app.get("/getpost/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ data: post });
  } catch (error) {
    new Error(error);
  }
});

app.post("/createpost", checkAdmin, async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        deadLine: new Date(deadline),
      },
    });
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    new Error(error);
  }
});

app.delete("/deletepost/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    new Error(error);
  }
});

app.put("/check/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const data = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!data) {
      return res.status(404).json({ message: "Post not found" });
    }

    await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isCheck: data.isCheck ? false : true,
      },
    });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    new Error(error);
  }
});

app.put("/updatepost/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, categoryId } = req.body;
  const date = new Date(deadline);
  try {
    const data = {
      ...(title && { title }),
      ...(description && { description }),
      ...(deadline && { deadLine: new Date(deadline) }),
      ...(categoryId && { categoryId: parseInt(categoryId) }),
    };
    await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { username: user.username, role: user.role },
    },
    "admin123"
  );

  res.status(200).json({ message: "Login success", token });
});

app.post("/register", checkAdmin, async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role: "admin",
      },
    });
    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    new Error(error);
  }
});

app.post("/createcategory", checkAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res
      .status(200)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    new Error(error);
  }
});

app.get("/getcategory", async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    res.status(200).json({ data: category });
  } catch (error) {
    new Error(error);
  }
});

app.post("/createcategory", checkAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    new Error(error);
  }
});

app.delete("/deletecategory/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    new Error(error);
  }
});

app.get("/getpostbycategory/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.post.findMany({
      where: {
        categoryId: parseInt(id),
      },
      include: {
        category: true,
      },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ data: category });
  } catch (error) {
    new Error(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
