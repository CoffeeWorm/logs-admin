const path = require('path');

const getAbsPath = (reletivePath) => path.resolve(__dirname, reletivePath);

module.exports = { getAbsPath };
