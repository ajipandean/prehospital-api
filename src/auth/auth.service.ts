import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async findByEmail(email: string): Promise<any> {
    return await this.usersService.findByEmail(email);
  }
}
