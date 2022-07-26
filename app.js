const dotenv = require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//const initiateDB = require('./startUp/initiateDB');
const PORT = process.env.PORT || 8080;
const routes = require('./routes');

const app = express();

app.set('port', PORT);
console.log('PORT', PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200
}));
app.use('/api', routes);

console.log('process.env', process.env);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  try {
    // mongoose.connection.once('open', () => {
    //   initiateDB();
    // });
    await mongoose.connect(process.env.MONGO_URI);
    console.log('process.env.MONGO_URI', process.env.MONGO_URI);
    console.log('PORT', PORT);
    app.listen(PORT, () => {
    console.log(chalk.bgCyan(`Server has been started on port: ${PORT}`));
});
  } catch(error) {
    console.log(chalk.redBright(error));
    process.exit(1);
  }
};

start();