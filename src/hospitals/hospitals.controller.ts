import { Controller, Get } from '@nestjs/common';
import { Hospitals } from './hospitals.entity';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  async getHospitals(): Promise<Hospitals[]> {
    return await this.hospitalsService.findAll();
  }
}
