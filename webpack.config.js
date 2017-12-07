const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./www/app/main",
    output: {
        path: path.resolve(__dirname, "www/dist"),
        filename: "[name].js",
        chunkFilename : '[name].min.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "www/app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["env" , "react"] ,
                    plugins: ["transform-decorators-legacy","transform-object-rest-spread","transform-runtime","dynamic-import-webpack","transform-class-properties"]
                }
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, "www/app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","less-loader"]
                })
            },
            { 
                test: /\.ts$/,
                include: [
                    path.resolve(__dirname, "www/app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'ts-loader' 
            },
            {
                test: /\.svg/, 
                include: [
                    path.resolve(__dirname, "www/images")
                ],
                loader: 'svg-url-loader'
            },
        ]
    },
    
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    watch : true
}