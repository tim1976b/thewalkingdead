import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import { Patient } from "../entity/Patient";


export async function patientSaveAction(request: Request, response: Response) {

    const patientRepository = getManager().getRepository(Patient);

    const newPatient = patientRepository.create(request.body);

    await patientRepository.save(newPatient);

    response.send(newPatient);
}

export async function patientGetAllAction(request: Request, response: Response) {

    const patientRepository = getManager().getRepository(Patient);

    const patients = await patientRepository.find();

    response.send(patients);

}

export async function patientGetByIdAction(request: Request, response: Response) {

    const patientRepository = getManager().getRepository(Patient);

    const patient = await patientRepository.findOne(request.params.id);

    // XXX use next:NextFunction 
    if (!patient) {
        response.status(404).end("resource not found"); // XXX duplicate
        return;
    }

    response.send(patient);
}
