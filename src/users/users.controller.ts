import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request as Req, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async insertOne(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const isUserExist = await this.userService.countUsers({
      email: user.email,
    });
    if (isUserExist)
      throw new BadRequestException({
        error: true,
        statusCode: HttpStatus.BAD_REQUEST,
        message: `User with email ${user.email} already exist.`,
        data: null,
      });

    const newUser = await this.userService.insertOne(user);
    delete newUser['password'];

    res.status(HttpStatus.CREATED);
    return {
      error: false,
      statusCode: HttpStatus.OK,
      message: 'User has been created successfully.',
      data: {
        user: newUser,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: Req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param() params: any,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    const isUserExist = await this.userService.countUsers({ id: params.id });
    if (!isUserExist)
      throw new BadRequestException({
        error: true,
        statusCode: HttpStatus.BAD_REQUEST,
        message: `User with id ${params.id} doesn't exists`,
        data: null,
      });

    const editedUser = await this.userService.updateOne(
      params.id,
      createUserDto,
    );

    return {
      error: false,
      statusCode: HttpStatus.OK,
      message: 'User has been updated sucessfully.',
      data: {
        user: editedUser,
      },
    };
  }
}
