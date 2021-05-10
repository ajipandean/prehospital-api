import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Chats } from './chats.entity';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection {
  constructor(private readonly chatsService: ChatsService) {}

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
