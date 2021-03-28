import "reflect-metadata";
import { createConnection } from "typeorm";
import { Routes } from "./routes";
import express, { Request, Response, NextFunction } from "express";
import webpack from 'webpack';
import cors from "cors";
import helmet from "helmet";
import path from "path";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webPackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";

import { errorHandler } from "./common/error";
import { notFoundHandler } from "./common/error-not-found";

import webPackConfig from '../../webpack.config';
import { PROJECT_TITLE } from "../common/constants";
import { Patient } from "./entity/Patient";

const IS_DEV_ENV = !process.env.BUILD_ENV;
const { PORT = 3000 } = process.env;


createConnection( // XXX change to config file instead
    {
        type: 'sqlite',
        database: 'database.sqlite',
        synchronize: true,
        logging: false,
        entities: [
            Patient
        ]
    }
).then(async connection => {

    const app: any = express();

    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", "http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses", "http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "'unsafe-inline'"]
        }
    }));
    app.use(cors());
    app.use(express.json());

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

        // app.use(webpackHotServerMiddleware(compiler)); // XXX bugs :S 


    } else {
        app.use(express.static(path.resolve(__dirname, "../client/")));
    }
    type RoutesType = {
        path: string,
        method: string,
        action: (request: any, response: any) => Promise<any>
    }
    Routes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: NextFunction) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    app.use(errorHandler);
    app.use(notFoundHandler);

    app.listen(PORT, function () {
        console.log(`${PROJECT_TITLE} is listening on port ${PORT}!`);
    });

}).catch(error => console.log("TypeORM connection error: ", error));