const Contact = require ('../models/contact'); //импортируем модель контактов
const createPath = require('../helpers/create-path') // импорт функции создания пути

const getContact = (req,res) => {
    const title = 'Contacts'
    Contact
      .find() 
      .then((contacts) => res.render(createPath('contacts'), { contacts, title }))
      .catch((error) => {
        console.log(error);
        res.render(createPath('error'), {title: 'Error' })
      });
    };

module.exports = {
    getContact,
};
