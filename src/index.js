const express = require('express');
const cors = require('cors');

const db = require('./db');
const userRouter = require('./routes/users');

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json());
app.use(userRouter);

app.listen(PORT, ()=>{
    console.log('Server in running on PORT: ', PORT);
})