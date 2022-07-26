const express = require('express');
const chalk = require('chalk')
const morgan = require('morgan');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
require ('dotenv').config();
const { error } = require('console');
const methodOverride = require('method-override'); //добавляет метод put в ui запрос
const postRoutes = require('./routes/post-routes'); // роутер постов
const contactRoutes = require('./routes/contact-routes'); // роутер контактов
const createPath = require('./helpers/create-path') // импорт функции создания пути
const postApiRoutes = require('./routes/api-post-routes') // api роутер постов

const errorMsg = chalk.bgKeyword('white').redBright
const succesMsg = chalk.bgKeyword('green').white;

const app = express(); // запускаем express

app.set('view engine', 'ejs'); //подключение шаблонизатора ejs

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
  .then((res) => console.log(succesMsg('Connected to DB')))
  .catch((error) => console.log(errorMsg(error)));

app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(succesMsg(`listening port ${process.env.PORT}`));
}); 

// midleware (промежуточный код)
app.use(express.urlencoded({extended: false})); //парсим пост запрос и вытягиваем с него инфу

app.use(express.static('styles')); //даем доступ к папке styles браузеру

app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // выводит доп информацию в лог

app.use(methodOverride('_method')); // подключаем метод PUT


// Запросы (роуты)
app.get('/',(req,res) => {
  const title = 'Home'
  res.render(createPath('index'), {title})
});

app.get('/about-us',(req,res) => {
res.redirect('/contacts')
});

app.use(postRoutes); // подключаем роуты постов
app.use(contactRoutes); // подключаем роуты контактов
app.use(postApiRoutes); // подключаем api роуты постов

app.use((req,res) => {
  const title = 'Error'
  res.render(createPath('error'), {title})
});