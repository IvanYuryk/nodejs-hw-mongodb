import express from 'express';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import router from './routers/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', router);
app.use('/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export const setupServer = () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
