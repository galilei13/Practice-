import { v4 as uuid } from "uuid";

let tasks = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { task } = JSON.parse(req.body);
    const newTask = { id: uuid(), task };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === "DELETE") {
    const id = req.query.id;
    tasks = tasks.filter((task) => task.id !== id);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
