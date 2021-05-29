import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .leftJoinAndSelect('user.hospital', 'hospital')
      .getOne();
  }

  async insertOne(createUserDto: CreateUserDto): Promise<any> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async updateOne(id: string, createUserDto: CreateUserDto): Promise<any> {
    return await this.usersRepository.update(id, createUserDto);
  }

  async countUsers(query: any): Promise<number> {
    return await this.usersRepository.count(query);
  }
}
