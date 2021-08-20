import express from 'express';

import  mongoose from 'mongoose';

import { PORT, DB_URI } from './config/index.js';

import routes from './routes/index.js';

import errorHandler from './middlewares/errorHandler.js'

//Database connection 
mongoose.connect(DB_URI, { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true, });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => {
  console.log('connected');
});

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})