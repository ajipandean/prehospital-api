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

  async insertOne(createMessageDto: CreateMessageDto): Promise<Messages> {
    const newMessage = this.messagesRepository.create(createMessageDto);
    return await this.messagesRepository.save(newMessage);
  }
}
