const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
            template:'src/index.html'
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
         
        ],
      },
    
    

}