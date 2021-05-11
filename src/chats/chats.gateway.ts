import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Chats } from './chats.entity';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection {
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  handleTest(@MessageBody() message: string) {
    this.server.emit('recv_message', message);
  }

  @SubscribeMessage('init_chat')
  async handleInitChat(
    @MessageBody() createChatDto: CreateChatDto,
  ): Promise<Chats> {
    const chat = await this.chatsService.insertOne(createChatDto);
    return chat;
  }

  handleConnection() {
    console.log('Client connected');
  }
}
