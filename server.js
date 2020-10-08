const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
// import path from 'path';
const path = require('path')
// import routes
const authRoutes = require('./backend/routes/auth');
const userRoutes = require('./backend/routes/user');
const categoryRoutes = require('./backend/routes/category');
const productRoutes = require('./backend/routes/product');
const braintreeRoutes = require('./backend/routes/braintree');
const orderRoutes = require('./backend/routes/order');
const { Server } = require('http');
const { dirname } = require('path');

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

const port = process.env.PORT || 8000;

const dir = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dir, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(dir, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is runnin....')
  })
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(dir)
});
