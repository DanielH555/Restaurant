const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./mongoose');
const router = require('./routes/routing');
const usersRouter = require('./routes/clientsRouter');
const eventsRouter = require('./routes/eventsRouter');
const cartRouter = require('./routes/cartRouter');
const workersRouter = require('./routes/workersAuthRouter');


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

db()

app.use('/', router);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/workers', workersRouter);
app.use('/cart', cartRouter);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


