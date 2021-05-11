import { Chats } from 'src/chats/chats.entity';

export class CreateMessageDto {
  readonly chat: Chats;
  readonly message: string;
}
