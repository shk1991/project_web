const autoprefixer = require('autoprefixer')
module.exports = {
    plugins: [
        autoprefixer({ browsers: ['last 9 versions'], cascade: false })
    ]
}