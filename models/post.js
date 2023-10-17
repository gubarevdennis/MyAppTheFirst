const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({ // создаем схему для поста в мангусе
    text: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    },
{timestamps: true} //добавляем когда значения берем из приложения
);

const Post = mongoose.model('Post', postSchema); // создаем модель для поста в мангусе

module.exports = Post;

