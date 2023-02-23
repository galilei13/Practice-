import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const addTask = async (event) => {
    event.preventDefault();
    const { value } = event.target.elements.task;
    if (value) {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: value }),
      });
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        event.target.reset();
      }
    }
  };

  const removeTask = async (id) => {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <div>
      <h1>To-Do List App</h1>
      <form onSubmit={addTask}>
        <input type="text" name="task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task}
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
