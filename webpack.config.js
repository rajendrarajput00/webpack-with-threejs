const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: '.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // clean: true,
    },
    plugins: [
       
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    module: {
        rules: [

            // CSS
            {
                test: /\.css$/,
                use:
                    [
                        'css-loader'
                    ]
            },
            {
                test: /\.(woff2?|jpe?g|png|gif|jpg|ico)$/,
                use: 'file-loader?name=./assets/images/[name].[ext]'
            }

        ],
    },



}