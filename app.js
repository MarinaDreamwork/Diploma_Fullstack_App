const dotenv = require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//const initiateDB = require('./startUp/initiateDB');
const PORT = config.get('port');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  try {
    // mongoose.connection.once('open', () => {
    //   initiateDB();
    // });
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
    console.log(chalk.bgCyan(`Server has been started on port: ${PORT}`));
});
  } catch(error) {
    console.log(chalk.redBright(error));
    process.exit(1);
  }
};

start();