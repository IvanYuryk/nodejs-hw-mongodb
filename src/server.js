import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { PUBLIC_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';


import router from './routers/auth.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(PUBLIC_DIR));

app.use('/api-docs', swaggerDocs());

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
