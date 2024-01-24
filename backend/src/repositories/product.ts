import { Product } from '../entity/Product'
import { BaseRepository } from './repository'

export class ProductRepository extends BaseRepository {
    _entity = Product
}
