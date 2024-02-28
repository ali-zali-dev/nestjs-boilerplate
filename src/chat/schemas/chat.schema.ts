import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Chatroom } from '../../chatroom/schemas/chatroom.schema';
console.log(Chatroom.name);

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  content: string;

  @Prop()
  messageStatus: string;

  @Prop()
  user: number;

  @Prop({ type: Types.ObjectId, ref: 'Chatroom' }) //ref: Chatroom.name
  chatroom: Chatroom;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
