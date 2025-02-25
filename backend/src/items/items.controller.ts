import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { Item } from './schemas/item.schema';
import { UpdateItemDto } from './dtos/update-item.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateItemDto): Promise<Item> {
        const item = await this.itemsService.create(body);
        return item;
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Item> {
        return this.itemsService.findOne(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Body() body: UpdateItemDto, @Param('id') id: string): Promise<Item> {
        return this.itemsService.update(id, body);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async partialUpdate(@Param('id') id: string, @Body() body: UpdateItemDto): Promise<Item> {
        return this.itemsService.partialUpdate(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> {
        return this.itemsService.remove(id);
    }
}
