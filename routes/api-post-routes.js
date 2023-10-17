const express = require('express');
const {
    getPost,
    deletePost,
    editPost,
    getPosts,
    addPost 
} = require('../controller/api-post-controller');

const router = express.Router();

//запросы (роуты) постов

router.get('/api/posts', getPosts); // получить все посты

router.get('/api/posts/:id', getPost); //получить конктретный пост

router.put('/api/edit/:id', editPost);//  обновить данные в посте

router.delete('/api/posts/:id', deletePost);// удалить конкретный пост

router.post('/api/add-post', addPost)// добавить пост


module.exports = router;