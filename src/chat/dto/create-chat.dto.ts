import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  messageStatus: string;

  @ApiProperty()
  user: number;

  @ApiProperty()
  chatroomId: string;
}
