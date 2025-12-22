const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB credentials (easy to understand)
const DB_USERNAME = "nikhilchaube08_db_user";
const DB_PASSWORD = "@LA@q53nHHu%*53"; // raw password (with special chars)
const DB_NAME = "mydatabase";

const encodedPassword = encodeURIComponent(DB_PASSWORD);
const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${encodedPassword}@cluster0.ruzol6z.mongodb.net/${DB_NAME}`;

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Todo Schema
const TodoSchema = new mongoose.Schema({
  task: String,
});

const Todo = mongoose.model("Todo", TodoSchema);

// Get All Todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add Todo
app.post("/todos", async (req, res) => {
  const todo = new Todo({ task: req.body.task });
  await todo.save();
  res.json(todo);
});

// Delete Todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});