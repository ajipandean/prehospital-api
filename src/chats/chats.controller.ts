import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Chats } from './chats.entity';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChats(): Promise<Chats[]> {
    return await this.chatsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('hospital/:id')
  async getChatsByHospital(@Param() params: any): Promise<Chats[]> {
    return await this.chatsService.findAllByHospital(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSingleChat(@Param() params: any): Promise<Chats> {
    return await this.chatsService.findById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateChatPrediction(@Param() params: any, @Query('p') p: string) {
    await this.chatsService.updateOne(params.id, p);
    return {
      error: false,
      message: 'Chat has been updated successfully',
      data: null,
    };
  }

  // Testing endpoints
  @Post()
  async postSingleChat(@Body() createChatDto: CreateChatDto): Promise<Chats> {
    return this.chatsService.insertOne(createChatDto);
  }
}
