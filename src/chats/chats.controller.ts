import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getChats(): string {
    return this.chatsService.helloWorld();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getSingleChat(@Param() params: any): string {
    return params.id;
  }
}
