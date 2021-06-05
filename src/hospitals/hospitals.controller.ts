import { Controller, Get, Param } from '@nestjs/common';
import { CurrentCoordinateDto } from './dto/current-coordinate.dto';
import { Hospitals } from './hospitals.entity';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get("")
  async getAllHospitals(): Promise<Hospitals[]> {
    return await this.hospitalsService.fetchHospitals()
  }

  @Get(':latitude/:longitude')
  async getHospitals(@Param() params: any): Promise<Hospitals[]> {
    const coordinate: CurrentCoordinateDto = {
      latitude: params.latitude,
      longitude: params.longitude,
    };
    return await this.hospitalsService.findAll(coordinate);
  }
}
