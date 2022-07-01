const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
  });

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.get('/',(req,res) => {
    res.render(createPath('index'))
})