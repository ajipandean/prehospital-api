import { Hospitals } from 'src/hospitals/hospitals.entity';
import { Users } from 'src/users/users.entity';

export class CreateChatDto {
  readonly user: Users;
  readonly hospital: Hospitals;
}
