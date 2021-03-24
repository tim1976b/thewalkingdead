import express from 'express';
import webpack from 'webpack';
import path from "path";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webPackHotMiddleware from "webpack-hot-middleware";
import webPackConfig from '../../webpack.config';
import { PROJECT_TITLE } from "../common/constants";

const IS_DEV_ENV = !process.env.BUILD_ENV;
const { PORT = 3000 } = process.env;
const app = express();

console.info("IS_DEV_ENV", IS_DEV_ENV);

if (IS_DEV_ENV) {
    const compiler = webpack(webPackConfig as webpack.Configuration[]);
    const compilers = compiler.compilers as webpack.Compiler[];
    const clientCompiler = compilers.find(({ name }) => name === "client");

    app.use(
        webpackDevMiddleware(compiler as any as webpack.Compiler, {
            publicPath: "/",
        })
    );

    if (clientCompiler) {
        app.use(webPackHotMiddleware(clientCompiler));
    }

} else {
    app.use(express.static(path.resolve(__dirname, "../client/")));
}
app.listen(PORT, function () {
    console.log(`${PROJECT_TITLE} is listening on port ${PORT}!`);
});