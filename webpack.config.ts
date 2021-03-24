import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { INDEX_TEMPLATE_FILENAME, PROJECT_TITLE } from "./src/common/constants";
import webpackNodeExternals from "webpack-node-externals"
import { CleanWebpackPlugin } from "clean-webpack-plugin";
const IS_PRODUCTION = process.env.BUILD_ENV;

const babelConfig = (IS_SERVER: boolean) => ({
    babelrc: false,
    presets: [["@babel/preset-react"], ["@babel/preset-env", {
        // corejs: IS_SERVER ? undefined : "3.8",
        // useBuiltIns: IS_SERVER ? false : "usage",
        targets: IS_SERVER ? {
            node: "current"
        } : {
            "chrome": "58",
            "ie": "11"
        }
    }]],
})

const clientConfig = {

    name: "client",
    mode: IS_PRODUCTION ? "production" : "development",
    entry: { client: "/src/client/index.tsx" },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "build/client"),
        filename: "[name].bundle.js",
        // clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelConfig(false),
                    },
                    {
                        loader: "ts-loader",
                    }],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: `src/client/${INDEX_TEMPLATE_FILENAME}`,
        filename: "index.html",
        title: PROJECT_TITLE,
        minify: IS_PRODUCTION ? {
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        } : false
    }), new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['build/client/*'] })],
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
}

const serverConfig = {
    name: "server",
    mode: IS_PRODUCTION ? "production" : "development",
    entry: { server: "/src/server/server.ts" },
    devtool: 'inline-source-map',
    target: "node",
    output: {
        path: path.resolve(__dirname, "build/server"),
        filename: "[name].bundle.js",
        libraryTarget: "commonjs2",
        // clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelConfig(true),
                    },
                    {
                        loader: "ts-loader",
                    }],
            }
        ]
    },
    plugins: [new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['build/server/*'] })],
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    externals: [webpackNodeExternals()]
}


const configurations = [clientConfig, serverConfig]
export default configurations;
