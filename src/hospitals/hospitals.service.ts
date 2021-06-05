import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentCoordinateDto } from './dto/current-coordinate.dto';
import { Hospitals } from './hospitals.entity';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospitals)
    private readonly hospitalsRepository: Repository<Hospitals>,
  ) { }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const deg2rad = (n: number) => n * (Math.PI / 180.0);
    const rad2deg = (n: number) => n * (180.0 / Math.PI);

    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      const theta = lon1 - lon2;
      let distance =
        Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.cos(deg2rad(theta));
      distance = Math.acos(distance);
      distance = rad2deg(distance);

      const miles = distance * 60 * 1.1515;
      return miles * 1.609344;
    }
  }

  async fetchHospitals(): Promise<Hospitals[]> {
    return await this.hospitalsRepository.find()
  }

  async findAll(
    currentCoordinateDto: CurrentCoordinateDto,
  ): Promise<Hospitals[]> {
    let hospitals = await this.hospitalsRepository.find();
    hospitals = hospitals.map((h) => {
      h.distances_from_ambulance = this.getDistance(
        currentCoordinateDto.latitude,
        currentCoordinateDto.longitude,
        h.latitude,
        h.longitude,
      );
      return h;
    });

    hospitals = hospitals.sort(
      (a, b) => a.distances_from_ambulance - b.distances_from_ambulance,
    );

    return hospitals;
  }
}
