import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async insertOne(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Users> {
    const isUserExist = await this.userService.findByEmail(user.email);
    if (isUserExist)
      throw new BadRequestException(
        `User with email ${user.email} already exist.`,
      );

    res.status(HttpStatus.CREATED);
    return await this.userService.insertOne(user);
  }
}
