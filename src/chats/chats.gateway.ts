import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto
  ) {
    client.join(createMessageDto.chat.id);
    const newMessage = await this.messagesService.insertOne(createMessageDto);
    this.server.to(newMessage.chat.id).emit('recv_message', newMessage);
  }

  @SubscribeMessage('init_chat')
  async handleInitChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const createChatDto: CreateChatDto = JSON.parse(data);
    const chat = await this.chatsService.insertOne(createChatDto);
    return chat;
  }

  @SubscribeMessage("test")
  handleTest(@MessageBody() data: String): String {
    console.log("Hello from socket");
    return "Hello too";
  }

  handleConnection() {
    console.log('Client connected');
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }
}
