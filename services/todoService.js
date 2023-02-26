import Todo from "../model/todo.js";

export const Todos = async () => {
  const Todos = await Todo.find();
  return Todos;
};

export const getSingleTodo = async (id) => {
  const Todo = await Todo.findById({ _id: id });
  if (!Todo) return "no Todo found ";
  return Todo;
};

export const addTodo = async (TodoData) => {
  const Todos = new Todo(TodoData);
  await Todos.save();
  return Todos;
};

export const update = async (id, data) => {
  const updated = await Todo.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isCompleted: data.updateObj.isCompleted,
        completed_time: data.updateObj.completed_time,
      },
    }
  );
  return updated;
};

export const deleteTodo = async (id) => {
  const del = await Todo.findByIdAndDelete({ _id: id });
  return del;
};
