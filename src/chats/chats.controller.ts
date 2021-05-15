import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Chats } from './chats.entity';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChats(): Promise<Chats[]> {
    return await this.chatsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSingleChat(@Param() params: any): Promise<Chats> {
    return await this.chatsService.findById(params.id);
  }
}
