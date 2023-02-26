import { Todos, deleteTodo, addTodo, update } from "../services/todoService.js";

export const getTodos = async (req, res) => {
  try {
    const TodoData = await Todos();
    return res.send(TodoData);
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const createTodo = async (req, res) => {
  const TodoData = req.body;
  try {
    await addTodo(TodoData);
    return res.send({ statusCode: 200, data: "Todo created Successfully" });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const updateTodo = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!id || !data) {
    return res.send({
      message: "ID is required in parameters",
      statusCode: 500,
    });
  }
  try {
    await update(id, data);
    return res.send({ message: "data updated successfully", statusCode: 200 });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const delTodo = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.send({
      message: "ID is required in parameters",
      statusCode: 500,
    });
  }
  try {
    await deleteTodo(id);
    return res.send({ message: "Todo deleted successfully", statsCode: 200 });
  } catch (err) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};
