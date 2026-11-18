import { Module } from '@nestjs/common';
import { PetSuppliesController } from './pet-supplies/pet-supplies.controller';
import { PetSuppliesService } from './pet-supplies/pet-supplies.service';

@Module({
  imports: [],
  controllers: [PetSuppliesController],
  providers: [PetSuppliesService],
})
export class AppModule {}
