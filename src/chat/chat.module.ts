import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatroomModule } from './chatroom/chatroom.module';
import { ChatSocketModule } from './chat-socket/chat-socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    ChatroomModule,
    ChatSocketModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
