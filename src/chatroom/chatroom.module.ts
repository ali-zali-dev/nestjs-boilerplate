import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatroom } from './entities/chatroom.entity';
import { ChatroomSchema } from './schemas/chatroom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatroom.name, schema: ChatroomSchema },
    ]),
  ],
  controllers: [ChatroomController],
  providers: [ChatroomService],
  exports: [ChatroomService],
})
export class ChatroomModule {}
