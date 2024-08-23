import express from 'express';
import cors from 'cors';
import { register, login, users } from './controllers/user.controller.js';
import postController from './controllers/post.controller.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/register', register);
app.use('/login', login);
app.use('/users', users);
app.use('/post', postController);

export default app;
