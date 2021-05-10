import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './chats.entity';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chats])],
  exports: [ChatsService],
  providers: [ChatsService],
})
export class ChatsModule {}
