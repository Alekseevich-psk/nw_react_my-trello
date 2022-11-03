const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map((item) => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false,
        });
    });
}

const htmlPlugins = generateHtmlPlugins("app/html/views");

const config = {
    entry: ["./app/js/index.js", "./app/scss/style.scss"],
    // entry: "./app/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js",
    },
    // devtool: "source-map",
    mode: "production",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist/js"),
        },
        compress: false,
        // hot: false,
        client: {
            progress: true,
            overlay: {
                errors: false,
                warnings: false,
            },
        },
        compress: true,
        port: 9000,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            new TerserPlugin({
                extractComments: true,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, "app/scss"),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        autoprefixer,
                                        {
                                            browsers: ['last 3 versions', '> 1%']
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, "app/html/includes"),
                use: ["raw-loader"],
            },
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, "app/js"),
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: "defaults",
                                    },
                                ],
                                "@babel/preset-react",
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.bundle.css",
        }),
        new CopyPlugin({
            patterns: [
                // {
                //     from: "app/fonts",
                //     to: "fonts",
                // },
                {
                    from: "app/favicon",
                    to: "favicon",
                },
                {
                    from: "app/img",
                    to: "img",
                },
                // {
                //     from: "app/uploads",
                //     to: "uploads",
                // },
            ],
        }),
    ].concat(htmlPlugins),
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.plugins.push(new CleanWebpackPlugin());
    }
    return config;
};
