var path = require("path");

module.exports = {
    entry: {
        main: './App.ts',
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    }
};