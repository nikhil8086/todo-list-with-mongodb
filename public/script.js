const list = document.getElementById("todoList");
const input = document.getElementById("taskInput");

function loadTodos() {
  fetch("/todos")
    .then(res => res.json())
    .then(todos => {
      list.innerHTML = "";
      todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.task + " ";

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => deleteTask(todo._id);

        li.appendChild(btn);
        list.appendChild(li);
      });
    });
}

function addTask() {
  if (!input.value) return alert("Enter task");

  fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: input.value })
  })
    .then(() => {
      input.value = "";
      loadTodos();
    });
}

function deleteTask(id) {
  fetch(`/todos/${id}`, { method: "DELETE" })
    .then(() => loadTodos());
}

loadTodos();