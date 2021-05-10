import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './chats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chats])],
})
export class ChatsModule {}
