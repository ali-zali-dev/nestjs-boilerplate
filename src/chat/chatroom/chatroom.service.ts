import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { Chatroom, ChatroomDocument } from './schemas/chatroom.schema';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectModel(Chatroom.name) private chatroomModel: Model<ChatroomDocument>,
  ) {}

  create(createChatroomDto: CreateChatroomDto) {
    const createdChatroom = new this.chatroomModel(createChatroomDto);
    return createdChatroom.save();
  }

  findAll() {
    return this.chatroomModel.find().populate('chats');
  }

  findOne(id: string) {
    return this.chatroomModel.findById(id);
  }

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
