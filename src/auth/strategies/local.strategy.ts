import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.findByEmail(email);
    if (!user)
      throw new UnauthorizedException({
        data: null,
        error: true,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: `User with email ${email} not found`,
      });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException({
        data: null,
        error: true,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: `Invalid password for email ${email}`,
      });

    delete user['password'];
    return user;
  }
}
