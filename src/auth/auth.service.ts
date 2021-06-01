import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<any> {
    return await this.usersService.findByEmail(email);
  }

  async generateToken(user: any) {
    const payload = { id: user.id };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
