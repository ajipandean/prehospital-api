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

  async findAll(): Promise<Chats[]> {
    return await this.chatsRepository.find();
  }

  async findById(id: string): Promise<Chats> {
    return await this.chatsRepository
      .createQueryBuilder('chat')
      .where('chat.id = :id', { id })
      .leftJoinAndSelect('chat.messages', 'messages')
      .getOne();
  }

  async insertOne(createChatDto: CreateChatDto): Promise<Chats> {
    const chat = this.chatsRepository.create(createChatDto);
    return await this.chatsRepository.save(chat);
  }
}
