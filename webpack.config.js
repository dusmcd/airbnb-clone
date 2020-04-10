const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/javascript/src/main',
    output: {
        path: path.resolve(__dirname, 'public', 'javascript', 'dist'),
        filename: 'bundle.js'
    }
};
