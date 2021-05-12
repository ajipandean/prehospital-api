import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { ChatsGateway } from './chats/chats.gateway';
import { MessagesModule } from './messages/messages.module';
import { HospitalsModule } from './hospitals/hospitals.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    AuthModule,
    ChatsModule,
    MessagesModule,
    HospitalsModule,
  ],
  providers: [ChatsGateway],
})
export class AppModule {}
