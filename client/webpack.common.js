const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/index.ts','./src/styles/main.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename:'css/style.css'})
    ],
    module: {
        rules: [
             {
                test: /\.js|ts$/,
                use : {
                    loader: 'babel-loader',
                    options: {
                        presets :[
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ],
                        plugins :['@babel/plugin-proposal-class-properties']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
}