import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { INDEX_TEMPLATE_FILENAME, PROJECT_TITLE } from "./src/common/constants";
import webpackNodeExternals from "webpack-node-externals"
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack, { DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const IS_PRODUCTION = !!process.env.BUILD_ENV;

const babelConfig = (IS_SERVER: boolean) => ({
    babelrc: false,
    presets: [["@babel/preset-react"], ["@babel/preset-env", {
        targets: IS_SERVER ? {
            node: "current"
        } : "defaults"
    }]],
    plugins: ["@babel/plugin-transform-runtime"],
})

const clientConfig = {

    name: "client",
    mode: IS_PRODUCTION ? "production" : "development",
    entry: IS_PRODUCTION ? ["/src/client/index.tsx"] : ["/src/client/index.tsx", "webpack-hot-middleware/client"],
    devtool: IS_PRODUCTION ? 'nosources-source-map' : 'inline-source-map',
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
    plugins: [

        new HtmlWebpackPlugin({
            template: `src/client/${INDEX_TEMPLATE_FILENAME}`,
            filename: "index.html",
            title: PROJECT_TITLE,
            minify: IS_PRODUCTION ? {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            } : false
        }),
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['build/client/*'] }),
        IS_PRODUCTION ? new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }) : new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        })
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: { chunks: "all" },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
}

const serverConfig = {
    name: "server",
    mode: IS_PRODUCTION ? "production" : "development",
    entry: { server: "/src/server/server.ts" },
    devtool: IS_PRODUCTION ? 'nosources-source-map' : 'inline-source-map',
    target: "node",
    node: { __dirname: false },
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
