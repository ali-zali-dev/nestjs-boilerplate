import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token = client.handshake.query.token as string;
    const req = context.switchToHttp().getRequest<Request>();
    (req.headers as object) = {};
    (req.headers['authorization'] as string) = 'Bearer ' + token;
    return client;
  }

  async canActivate(context: ExecutionContext) {
    try {
      return (await super.canActivate(context).valueOf()) as boolean;
    } catch (exception) {
      throw new WsException('WsException');
    }
  }
}
