const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        signIn : './scripts/signIn.js',
        signUp : './scripts/signUp.js',
        daily : './scripts/daily.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use : {
                    loader: 'file-loader',
                    options: {
                        outputPath: './image/',
                        name : '[name].[ext]?[hash]'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        overlay: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title : '',
            hash : true,
            filename : 'signIn.html',
            excludeChunks : ['signUp','daily'],
            template : './html/signIn.html'
        }),
        new HtmlWebpackPlugin({
            title : '',
            hash : true,
            filename : 'signUp.html',
            excludeChunks : ['signIn','daily'],
            template : './html/signUp.html'
        }),
        new HtmlWebpackPlugin({
            title : '',
            hash : true,
            filename : 'daily.html',
            excludeChunks : ['signIn','signUp'],
            template : './html/daily.html'
        }),
        // new CopyWebpackPlugin({
        //     patterns: ['./html/signIn.html']
        // }),
        // new webpack.HotModuleReplacementPlugin()
    ]
};