const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".ts",".js"],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        loaders: [
            {   test: /\.ts?$/, 
                loaders: ["ts-loader", "source-map-loader"],
            },
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            }
        ]
    },
    externals: {
        $ : 'jquery',
        jQuery : 'jquery',
        'window.$' : 'jquery',
        'window.jQuery' : 'jquery',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};