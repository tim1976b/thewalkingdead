import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

const app = express();
import webPackConfig from '../../webpack.config';
const compiler = webpack(webPackConfig as webpack.Configuration);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: "/",
    })
);

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});