import express from 'express';
import 'dotenv/config';
import router from "./routes/routes.js";
import { connectDB } from './config/database.js';

const app = express();
const port = process.env.PORT;


connectDB();

app.use(express.json());
app.use("/api", router);
app.listen(port, () => console.log(`Server running on port :  ${port}`));
