import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Hospitals } from './hospitals.entity';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHospitals(): Promise<Hospitals[]> {
    return await this.hospitalsService.findAll();
  }
}
