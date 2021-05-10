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

  async signJWT(user: any) {
    const payload = {
      group_name: user.group_name,
      email: user.email,
      role: user.role,
      sub: user.id,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
