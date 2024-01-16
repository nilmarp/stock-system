import { Client } from '../entity/Client'

export class ClientRepository {

    public async create(data: {
        name: string,
        surname: string,
        identification_number: string,
        email: string,
        phone: string,
        city: string,
        address: string,
        building_number: string,
        cep: string,
        reference?: string
    }): Promise<Client> {
        const client = new Client()

        for (const key in data) {
            client[key] = data[key]
        }

        await client.save()

        return client
    }

    public async findAll() {
        return await Client.find()
    }

    public async findBy(where) {
        return await Client.findBy(where)
    }

}