import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private itemModel: Model<Item>) { }

    async create(body: CreateItemDto): Promise<Item> {
        try {
            const newItem = new this.itemModel(body);
            return await newItem.save();
        } catch (error) {
            throw new InternalServerErrorException('Error creating item');
        }
    }

    async findAll(): Promise<Item[]> {
        try {
            return await this.itemModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving items');
        }
    }

    async findOne(id: string): Promise<Item> {
        try {
            const item = await this.itemModel.findById(id).exec();
            if (!item) {
                throw new NotFoundException(`Item with id ${id} not found`);
            }
            return item;
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving item');
        }
    }

    async update(id: string, body: UpdateItemDto): Promise<Item> {
        try {
            const updatedItem = await this.itemModel.findByIdAndUpdate(id, body, { new: true }).exec();
            if (!updatedItem) {
                throw new NotFoundException(`Item with id ${id} not found`);
            }
            return updatedItem;
        } catch (error) {
            throw new InternalServerErrorException('Error updating item');
        }
    }

    async partialUpdate(id: string, body: UpdateItemDto): Promise<Item> {
        const item = await this.itemModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }

        Object.keys(body).forEach((key) => {
            if (body[key] !== undefined) {
                item[key] = body[key];
            }
        });

        try {
            return await item.save();
        } catch (error) {
            throw new InternalServerErrorException('Error partially updating item');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            const result = await this.itemModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException(`Item with id ${id} not found`);
            }
        } catch (error) {
            throw new InternalServerErrorException('Error deleting item');
        }
    }
}
