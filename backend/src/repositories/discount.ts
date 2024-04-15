import { BaseEntity } from 'typeorm';
import { Discount } from '../entity/Discount'
import { BaseRepository } from './repository';

interface DiscountCreationData {
    discountable_id: number
    discountable_type: string
    amount: number
    redeemed_at?: Date
    expired_at?: Date
}

export class DiscountRepository extends BaseRepository {
    _entity = Discount;
    
    public create(data: DiscountCreationData): Promise<BaseEntity> {
        return super.create(data)
    }
}