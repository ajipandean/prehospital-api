import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './chats.entity';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chats])],
  exports: [ChatsService],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
