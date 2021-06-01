import {
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: Req) {
    const userToken = await this.authService.generateToken(req.user);

    return {
      error: false,
      statusCode: HttpStatus.OK,
      message: 'User has been logged in successfully',
      data: userToken,
    };
  }
}
