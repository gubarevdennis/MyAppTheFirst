const Post = require ('../models/post'); //импортируем модель поста

const hadleError = (res,error) => { // страница ошибки
  res.status(500).send(error.message);
}

const getPost = (req,res) => {
    const title = 'Post'
    Post // ищет конкретный пост и выдает объект
    .findById(req.params.id)  // по конкретному id который вытягиваем из запроса
    .then((post)=>res.status(200).json(post))
    .catch((error) => hadleError(res,error));
  };

const deletePost = (req,res) => { // удаление элемента по id
    const title = 'Post'
    Post // ищет конкретный пост и выдает объект
    .findByIdAndDelete(req.params.id)  // по конкретному id который вытягиваем из запроса
    .then(()=>res.status(200).json(req.params.id))
    .catch((error) => hadleError(res,error));
    // res.render(createPath('post'), { title, post})
  };

const editPost = (req,res) => { // редактируемому посту присваиваются новые значения
    const { title, author, text} = req.body;
    const { id } = req.params;
  
    Post // ищет конкретный пост и выдает объект
    .findByIdAndUpdate(id, { title, author, text }, {new: true})  // по конкретному id который вытягиваем из запроса
    .then((post)=>res.status(200).json(post)) 
    .catch((error) => hadleError(res,error));
  };

const getPosts = (req,res) => {
    const title = 'Posts'
    Post // ищет все посты и выдает массив
    .find() 
    .sort({createdAt: -1})
    .then((posts)=>res.status(200).json(posts))
    .catch((error) => hadleError(res,error));
    // res.render(createPath('posts'), {title, posts})
  };

const addPost = (req,res) => {  // пост запрос 
    const { title: title, author: author, text: text } = req.body; //вытягивает инфу из ui
    const post = new Post({ title, author, text }); // в конструктор передаем вытянутый с ui значения
  post  //занос в базу данных с ui
    .save()
    .then((post)=>res.status(200).json(post))
    // .then((result) => res.send(result))
    .catch((error) => hadleError(res,error));
    //res.render(createPath('post'), {post, title})
  };

module.exports = {
    getPost,
    deletePost,
    editPost,
    getPosts,
    addPost
}