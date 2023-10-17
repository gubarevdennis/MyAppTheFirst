const express = require('express');
const {
    getPost,
    deletePost,
    getEditPost,
    editPost,
    getPosts,
    getAddPost,
    addPost 
} = require('../controller/post-controller');

const router = express.Router();

//запросы (роуты) постов

router.get('/posts', getPosts); // получить все посты

router.get('/posts/:id', getPost); //получить конктретный пост

router.get('/edit/:id', getEditPost);// получить редактируемый пост

router.put('/edit/:id', editPost);//  обновить данные в посте

router.delete('/posts/:id', deletePost);// удалить конкретный пост

router.post('/add-post', addPost)// добавить пост

router.get('/add-post', getAddPost);// получить добавленный пост

module.exports = router;