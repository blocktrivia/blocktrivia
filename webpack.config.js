const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if(process.env.NODE_ENV == "test") {
    require("dotenv").config({ path: ".env.test"});
} else if (process.env.NODE_ENV == "development" ){
    require("dotenv").config({ path: ".env.dev"});
}

module.exports = (env) => {
    const isProduction = env === "production";
    const cssExtract = new ExtractTextPlugin("styles.css");
    return {
        entry: ['babel-polyfill','./src/app.js'],
        mode: isProduction ? "production" : "development",
        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    loader: "babel-loader",
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: cssExtract.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }
            ],
        },
        plugins: [
            cssExtract,
            new webpack.DefinePlugin({
                
            })
        ],
        devtool: isProduction ? "source-map" :'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: "/dist/"
        },
        
    };
};



