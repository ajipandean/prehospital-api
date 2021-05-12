import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals } from './hospitals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hospitals])],
})
export class HospitalsModule {}
