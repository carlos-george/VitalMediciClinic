import dotenv from 'dotenv';
dotenv.config();
import { app } from './app';

const PORT = process.env.PORT ? process.env.PORT : 3333;

const runningMsg = `Server is running on port ${PORT}!`;

app.listen(PORT, () => console.log(runningMsg));