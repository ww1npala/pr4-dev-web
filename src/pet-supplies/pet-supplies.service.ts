import { Injectable, NotFoundException } from '@nestjs/common';
import { PetSupply } from './entities/pet-supply.entity';
import { CreatePetSupplyDto } from './dto/create-pet-supply.dto';
import { UpdatePetSupplyDto } from './dto/update-pet-supply.dto';

@Injectable()
export class PetSuppliesService {
  private items: PetSupply[] = [
    {
      id: '1',
      title: 'Сухий корм для дорослих собак середніх порід',
      price: 1450,
      petCategory: 'Собаки',
      packageWeightKg: 10,
      brand: 'Royal Canin',
    },
    {
      id: '2',
      title: 'Наповнювач силікагелевий для котячого туалету',
      price: 380,
      petCategory: 'Коти',
      packageWeightKg: 3.8,
      brand: 'AnimAll',
    },
    {
      id: '3',
      title: 'Зернова суміш для хвилястих папуг',
      price: 120,
      petCategory: 'Птахи',
      packageWeightKg: 0.5,
      brand: 'Природа',
    },
  ];

  findAll(): PetSupply[] {
    return this.items;
  }

  findOne(id: string): PetSupply {
    const item = this.items.find((supply) => supply.id === id);
    if (!item) {
      throw new NotFoundException(`Зоотовар з ID ${id} не знайдено`);
    }
    return item;
  }

  create(dto: CreatePetSupplyDto): PetSupply {
    const newItem: PetSupply = {
      id: Date.now().toString(),
      ...dto,
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: string, dto: UpdatePetSupplyDto): PetSupply {
    const item = this.findOne(id);
    Object.assign(item, dto);
    return item;
  }

  remove(id: string): void {
    const index = this.items.findIndex((supply) => supply.id === id);
    if (index === -1) {
      throw new NotFoundException(`Зоотовар з ID ${id} не знайдено`);
    }
    this.items.splice(index, 1);
  }
}
