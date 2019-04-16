const path = require('path');

const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style/[name].css',
            chunkFilename: 'style/[id].css'
        }),
        new CopyPlugin([
            {from: 'assets/**/**', context: './dev/'}
        ]),
        new HtmlWebpackPlugin({
            title: 'Softgames Technical Test',
        })
    ],
    entry: {
        app: './dev/src/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    resolve: {
        alias:{
            Images: path.resolve(__dirname, 'dev/assets/img/'),
            Styles: path.resolve(__dirname, 'dev/style'),
            Utils: path.resolve(__dirname, 'dev/src/utils'),
            GameStates: path.resolve(__dirname, 'dev/src/states/')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },
            {
                test: /\.(png)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/font/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};