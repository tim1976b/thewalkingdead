import { Request, Response, NextFunction } from "express";

import {
    patientGetAllAction,
    patientGetByIdAction,
    patientSaveAction
} from "./service/patients.service";


type RoutesType = {
    path: string,
    method: string,
    action: (request: Request, response: Response, next?: NextFunction) => Promise<any>
}
export const Routes: RoutesType[] = [
    {
        path: "/patient",
        method: "get",
        action: patientGetAllAction
    },
    {
        path: "/patient/:id",
        method: "get",
        action: patientGetByIdAction
    },
    {
        path: "/patient",
        method: "post",
        action: patientSaveAction
    }
];