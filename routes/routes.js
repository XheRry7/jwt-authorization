import { AsyncRouter } from "express-async-router";
import { getTodos, createTodo, updateTodo, delTodo } from '../controllers/todo.js';

const router = AsyncRouter();

router.get('/getTodos', getTodos)
router.post('/createTodo', createTodo);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', delTodo);

export default router;
