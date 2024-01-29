import { BaseEntity } from 'typeorm';
import { Client } from '../entity/Client'
import { BaseRepository } from './repository';

interface ClientCreationData {
    name: string
    surname: string
    identification_number: string
    city: string
    phone: string
    cep: string
    address: string
    building_number: string
    email: string
    reference?: string
}

interface ClientUpdateData {
    name?: string
    surname?: string
    identification_number?: string
    city?: string
    phone?: string
    cep?: string
    address?: string
    building_number?: string
    email?: string
    reference?: string
}

export class ClientRepository extends BaseRepository {
    _entity = Client;
    
    public create(data: ClientCreationData): Promise<BaseEntity> {
        return super.create(data)
    }

    public update(entity: BaseEntity | number, data: ClientUpdateData) {
        return super.update(entity, data)
    }
}