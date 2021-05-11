import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chats } from './chats.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chats)
    private readonly chatsRepository: Repository<Chats>,
  ) {}

  helloWorld(): string {
    return 'Hello, world!';
  }

  async insertOne(createChatDto: CreateChatDto): Promise<Chats> {
    const chat = this.chatsRepository.create(createChatDto);
    return await this.chatsRepository.save(chat);
  }
}
