const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: './index.js',
    output: {
        filename: 'index_bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    },
    devServer: {
        port: "4200"
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            inject: "body"
        })
    ],
    resolve: {
        fallback: {
            "path": false,
            "util": false,
            "assert": false,
            "stream": false,
            "constants": false,
            "fs": false
        }
    },
    externals: {
        idb: 'idb',
    }
}