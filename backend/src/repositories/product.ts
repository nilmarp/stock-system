import { BaseEntity } from 'typeorm'
import { Product } from '../entity/Product'
import { Rental } from '../entity/Rental'
import { RentedProduct } from '../entity/RentedProduct'
import { BaseRepository } from './repository'

interface ProductCreationData {
    description: string
    quantity_owned: number
    quantity?: number
    daily_price: number
}

interface ProductUpdateData {
    description?: string,
    quantity_owned?: number,
    quantity?: number,
    daily_price?: number
}

export class ProductRepository extends BaseRepository {
    _entity = Product

    public async findOrderedById() {
        const builder = await this._entity
            .createQueryBuilder('product')
            .orderBy('product.id')
            
        this.setBuilder(builder)

        return this
    }

    public create(data: ProductCreationData): Promise<BaseEntity> {
        data.quantity = data.quantity_owned

        return super.create(data)
    }

    public async update(entity: number | BaseEntity, data: ProductUpdateData): Promise<void> {
        const product = await this.findOneBy({ id: entity }) as Product

        if (data.quantity_owned)
            data.quantity = product.quantity + (data.quantity_owned - product.quantity_owned) 
        
        return await super.update(product, data)
    }
}
