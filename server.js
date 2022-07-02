const express = require('express');
const path = require('path');
const morgan = require('morgan')

const app = express(); // запускаем express

app.set('view engine', 'ejs'); //подключение шаблонизатора ejs

const PORT = 3000;

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

// midleware 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles')); //даем доступ к папке styles браузеру

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`); // создаем путь

// Запросы
app.get('/',(req,res) => {
    const title = 'Home'
    res.render(createPath('index'), {title})
});

app.get('/about-us',(req,res) => {
  res.redirect('/contacts')
});

app.get('/contacts',(req,res) => {
  const title = 'Contacts'
  const contacts = [
  {name: 'Mew', link: 'http://youtube.com'},
  {name: 'Denis', link: 'http://youtube.com'},
  {name: 'Lubov', link: 'http://youtube.com'},
  ]
  res.render(createPath('contacts'), { contacts, title })
});

app.get('/posts/:id',(req,res) => {
  const title = 'Post'
  const post = {
    id: '1',
    text: 'Yohohohohanson',
    title: 'Post title',
    date: '05.05.67',
    author: 'Denis',
  }
  res.render(createPath('post'), { title, post} )
});

app.get('/posts',(req,res) => {
  const title = 'Posts'
  res.render(createPath('posts'), {title})
});

app.get('/add-post',(req,res) => {
  const title = 'Post'
  res.render(createPath('add-post'), {title})
});

app.use((req,res) => {
  const title = 'Error'
  res.render(createPath('error'), {title})
});