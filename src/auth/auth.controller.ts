import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: Req) {
    return this.authService.generateToken(req.user);
  }
}
