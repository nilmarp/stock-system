import { Client } from '../entity/Client'
import { BaseRepository } from './repository';
export class ClientRepository extends BaseRepository {
    _entity = Client;
    
    // custom methods here
}