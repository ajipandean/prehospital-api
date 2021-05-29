import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Messages } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
  ) {}

  async findMessagesByChatId(id: string): Promise<Messages[]> {
    return await this.messagesRepository
      .createQueryBuilder('message')
      .where('message.chat = :id', { id })
      .getMany();
  }

  async insertOne(createMessageDto: CreateMessageDto): Promise<Messages> {
    const newMessage = this.messagesRepository.create(createMessageDto);
    return await this.messagesRepository.save(newMessage);
  }

  async insertMany(createMessageDto: CreateMessageDto[]): Promise<Messages[]> {
    const result: Messages[] = [];
    createMessageDto.map(async (m) => {
      const newMessage = await this.insertOne(m);
      result.push(newMessage);
    });
    return result;
  }
}
