import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospitals } from './hospitals.entity';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospitals)
    private readonly hospitalsRepository: Repository<Hospitals>,
  ) {}

  async findAll(): Promise<Hospitals[]> {
    return await this.hospitalsRepository.find();
  }
}
