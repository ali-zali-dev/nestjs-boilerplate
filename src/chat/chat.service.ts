import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatroomService } from './chatroom/chatroom.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    private chatroomService: ChatroomService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const foundedChatroom = await this.chatroomService.findOne(
      createChatDto.chatroomId,
    );
    const createdChat = new this.chatModel(createChatDto);
    createdChat.chatroom = foundedChatroom.id;
    foundedChatroom.chats.push(createdChat._id);
    await foundedChatroom.save();

    return createdChat.save();
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
