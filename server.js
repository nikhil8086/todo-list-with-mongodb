const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect("mongodb+srv://nikhilchaube08_db_user:@LA@q53nHHu%*53@cluster0.mongodb.net/mydatabase")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Todo Schema
const TodoSchema = new mongoose.Schema({
  task: String
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



