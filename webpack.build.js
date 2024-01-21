const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],

    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js',
        clean: true,
        library: {
            type: "module",
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            }
        ]
    }
};