import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { Chats } from './chats.entity';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  async handleSendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const newMessage = await this.messagesService.insertOne(createMessageDto);
    this.server.emit('recv_message', newMessage);
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
