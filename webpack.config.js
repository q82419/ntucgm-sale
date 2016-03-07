var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: { app: './ts/react/App' },
    output: { filename: './built/[name].js', path: './' },
    resolve: {
        extensions: ['', '.ts', '.js', '.tsx', '.scss', 'css']
    },
    plugins: [
        new ExtractTextPlugin('./built/[name].css')
    ],
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.css?$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader") },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "url-loader?limit=100000"
            }
        ]
    }
}