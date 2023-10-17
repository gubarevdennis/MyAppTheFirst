const path = require('path');

const createPath = (page) => path.resolve(__dirname, '../ejs-views', `${page}.ejs`); // создаем путь

module.exports = createPath;