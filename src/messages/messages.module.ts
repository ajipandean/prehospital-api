import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './messages.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  exports: [MessagesService],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
