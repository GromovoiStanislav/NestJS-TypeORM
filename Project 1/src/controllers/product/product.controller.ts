import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param, ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.model';
import { Repository } from 'typeorm';

@Controller('products')
export class ProductController {

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  @Get()
  index() {
    return this.productRepo.find();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.productRepo.findOneOrFail({ where: { id } });
  }

  @Post()
  store(@Body() body) {
    const product = this.productRepo.create(body);
    return this.productRepo.save(product);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body) {
    await this.productRepo.findOneOrFail({ where: { id } });
    await this.productRepo.update({ id }, body);
    return await this.productRepo.findOne({ where: { id } });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productRepo.findOneOrFail({ where: { id } });
    await this.productRepo.delete({ id });
  }
}