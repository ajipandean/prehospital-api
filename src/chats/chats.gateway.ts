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
  async handleSendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const newMessage = await this.messagesService.insertOne(createMessageDto);
    this.server.to(createMessageDto.chat.id).emit('recv_message', newMessage);
  }

  @SubscribeMessage('send_bulk_messages')
  async handleSendBulkMessages(@MessageBody() createMessageDto: string) {
    const parsedMessages: CreateMessageDto[] = JSON.parse(createMessageDto)
    const newMessages = await this.messagesService.insertMany(parsedMessages);
    this.server.to(parsedMessages[0].chat.id).emit('recv_bulk_messages', newMessages)
  }

  @SubscribeMessage('join_chat')
  handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() id: string,
  ) {
    client.join(id)
  }

  @SubscribeMessage('init_chat')
  async handleInitChat(@MessageBody() data: string) {
    const createChatDto: CreateChatDto = JSON.parse(data);
    const chat = await this.chatsService.insertOne(createChatDto);
    return chat;
  }

  @SubscribeMessage("test")
  handleTest(): String {
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
