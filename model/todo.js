import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
  task_name: { type: String, default: null },
  isCompleted: { type: Boolean, default: false },
  completed_time: { type: Date, default: null },
  creation_time: { type: Date, default: Date.now() },
});

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
