import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { Messages } from './messages.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('chat/:id')
  async getMessages(@Param() params: any): Promise<Messages[]> {
    return await this.messagesService.findMessagesByChatId(params.id);
  }

  // Testing endpoints
  @Post()
  async postMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Messages> {
    return await this.messagesService.insertOne(createMessageDto);
  }
}
