import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PetSuppliesService } from './pet-supplies.service';
import { CreatePetSupplyDto } from './dto/create-pet-supply.dto';
import { UpdatePetSupplyDto } from './dto/update-pet-supply.dto';

@Controller('pet-supplies')
export class PetSuppliesController {
  constructor(private readonly petSuppliesService: PetSuppliesService) {}

  @Get()
  findAll() {
    return this.petSuppliesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petSuppliesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreatePetSupplyDto) {
    return this.petSuppliesService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePetSupplyDto) {
    return this.petSuppliesService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.petSuppliesService.remove(id);
  }
}
