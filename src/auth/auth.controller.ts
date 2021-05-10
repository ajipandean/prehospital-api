import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: Req) {
    return req.user;
  }
}
