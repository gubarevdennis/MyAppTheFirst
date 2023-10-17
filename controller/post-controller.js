const createPath = require('../helpers/create-path') // импорт функции создания пути
const Post = require ('../models/post'); //импортируем модель поста

const hadleError = (res,error) => { // страница ошибки
  console.log(error);
  res.render(createPath('error'), {title: 'Error' })
}

const getPost = (req,res) => {
    const title = 'Post'
    Post // ищет конкретный пост и выдает объект
    .findById(req.params.id)  // по конкретному id который вытягиваем из запроса
    .then((post) => res.render(createPath('post'), { post, title }))
    .catch((error) => hadleError(res,error));
    // res.render(createPath('post'), { title, post})
  };

const deletePost = (req,res) => { // удаление элемента по id
    const title = 'Post'
    Post // ищет конкретный пост и выдает объект
    .findByIdAndDelete(req.params.id)  // по конкретному id который вытягиваем из запроса
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => hadleError(res,error));
    // res.render(createPath('post'), { title, post})
  };

const getEditPost = (req,res) => { // редактируемому посту присваиваются имеющиеся значения
    const title = 'Edit post'
    Post // ищет конкретный пост и выдает объект
    .findById(req.params.id)  // по конкретному id который вытягиваем из запроса
    .then((post) => res.render(createPath('edit-post'), { post, title }))
    .catch((error) => hadleError(res,error));
  };

const editPost = (req,res) => { // редактируемому посту присваиваются новые значения
    const { title, author, text} = req.body;
    const { id } = req.params;
  
    Post // ищет конкретный пост и выдает объект
    .findByIdAndUpdate(id, { title, author, text })  // по конкретному id который вытягиваем из запроса
    .then((result) => res.redirect(`/posts/${id}`)) //редирект на пост именно с этим id
    .catch((error) => hadleError(res,error));
  };

const getPosts = (req,res) => {
    const title = 'Posts'
    Post // ищет все посты и выдает массив
    .find() 
    .sort({createdAt: -1})
    .then((posts) => res.render(createPath('posts'), { posts, title }))
    .catch((error) => hadleError(res,error));
    // res.render(createPath('posts'), {title, posts})
  };

const getAddPost = (req,res) => {
    const title = 'Post'
    res.render(createPath('add-post'), {title})
  };

const addPost = (req,res) => {  // пост запрос 
    const { title: title, author: author, text: text } = req.body; //вытягивает инфу из ui
    const post = new Post({ title, author, text }); // в конструктор передаем вытянутый с ui значения
  post  //занос в базу данных с ui
    .save()
    .then((result) => res.redirect('/posts')) //редирект на сраницу постов
    // .then((result) => res.send(result))
    .catch((error) => hadleError(res,error));
    //res.render(createPath('post'), {post, title})
  };

module.exports = {
    getPost,
    deletePost,
    getEditPost,
    editPost,
    getPosts,
    getAddPost,
    addPost
}