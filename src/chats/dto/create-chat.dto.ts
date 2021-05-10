import { Users } from 'src/users/users.entity';

export class CreateChatDto {
  readonly user_id: Users;
  readonly hospital_id: string;
}
