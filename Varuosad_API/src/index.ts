import express, { Request, Response } from 'express';
import usersControllers from './components/users/usersControllers';
import sparesControllers from './components/spares/sparesControllers';
import loggerControllers from './components/logger/loggerControllers';
import statusesControllers from './components/statuses/statusesControllers';
import manufacturersControllers from './components/manufacturer/manufacturerControllers';
import authControllers from './components/auth/authControllers';
import isLoggedInMiddleware from './middlewares/isLoggedInMiddleware';
import isAdmin from './middlewares/isAdmin';
import logger from './middlewares/loggingMiddleware';

import config from './config';

const app = express();

const { port } = config;

app.use(express.json());

app.get('/logs', logger, loggerControllers.getLogs);
app.post('/login', authControllers.login);

app.use(isLoggedInMiddleware);

app.get('/users', isAdmin, usersControllers.getUsers);
app.get('/users/:id', usersControllers.getUserById);
app.post('/users', usersControllers.createUser);
app.delete('/users/:id', usersControllers.deleteUser);

app.get('/statuses', statusesControllers.getStatuses);
app.get('/statuses/:id', statusesControllers.getStatusById);

app.get('/spares', sparesControllers.getSpares);
app.get('/spares/:id', sparesControllers.getSparesById);
app.post('/spares', sparesControllers.createSpare);
app.delete('/spares/:id', sparesControllers.deleteSpare);
app.put('/spares/:id', sparesControllers.updateSpare);

app.get('/manufacturer', manufacturersControllers.getManufacturers);
app.get('/manufacturer/:id', manufacturersControllers.getManufacturersById);
app.post('/manufacturer', manufacturersControllers.createManufacturer);
app.delete('/manufacturer/:id', manufacturersControllers.deleteManufacturer);
app.put('/manufacturer/:id', manufacturersControllers.updateManufacturer);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
