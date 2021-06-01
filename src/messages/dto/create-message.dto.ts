import { Chats } from 'src/chats/chats.entity';

export class CreateMessageDto {
  readonly chat: Chats;
  readonly message: string;
  readonly creationTime: string;
  readonly result?: string;
  readonly response?: string;
  readonly condition?: string;
  readonly action?: string;
  readonly attachments: string;
}
