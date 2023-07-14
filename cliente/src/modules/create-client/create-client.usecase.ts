import { prismaClient } from "../../infra/database/prismaClient";

type CreateClientRequest = {
    name: string;
    email: string;
    password: string;
    phone: string;

}

export class CreateClientUseCase {
  constructor(
   
  ) {}

  async execute(data: CreateClientRequest) {

    const { name, email, password, phone } = data

    const nameAlreadyExists = await prismaClient.client.findFirst({
        where: {
            name: data.name
        }
    });

    if(nameAlreadyExists) throw new Error("Name already exists!")

    const phoneIsNumber = Number(phone)

    if(!phoneIsNumber) throw new Error("Phone must be a number!")

    const customerAlreadyExists = await prismaClient.client.findFirst({
        where: {
            email: data.email
        }       
    })

    if(customerAlreadyExists) throw new Error("Customer already exists!")
    

    const customerCreated = await prismaClient.client.create({
        data: {
            ...data
        }
    });

    return customerCreated

  }
}