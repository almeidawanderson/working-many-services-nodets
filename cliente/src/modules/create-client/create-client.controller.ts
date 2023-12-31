import { Request, Response } from "express";
import { CreateClientUseCase } from "./create-client.usecase";



export class CreateCustomerController {
    constructor() {}

    async handle (request: Request, response: Response) {
        const useCase =  new CreateClientUseCase()

        try {
            const customer = await useCase.execute(request.body)
            return response.status(201).json(customer)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}