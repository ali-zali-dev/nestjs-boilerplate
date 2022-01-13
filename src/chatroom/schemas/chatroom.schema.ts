import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Chat } from '../../chat/schemas/chat.schema';

export type ChatroomDocument = Chatroom & Document;

@Schema()
export class Chatroom {
  @Prop()
  creatorId: number;

  @Prop()
  members: number[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Chat' }] }) //ref: Chat.name
  chats: Chat[];
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
