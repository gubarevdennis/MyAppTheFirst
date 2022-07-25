const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema ({ // создаем схему для поста в мангусе.
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    }
);

const Contact = mongoose.model('Contact', contactSchema); // создаем модель для поста в мангусе

module.exports = Contact;

