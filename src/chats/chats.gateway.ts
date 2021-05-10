import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection {
  @SubscribeMessage('chat')
  handleChat(@MessageBody() message: string): string {
    console.log(message);
    return message;
  }

  handleConnection() {
    console.log('Client connected');
  }
}
