import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
@Crud({
  model: {
    type: User,
  },
  routes: {
    getManyBase: {
      interceptors: [],
      decorators: [],
    },
    getOneBase: {
      interceptors: [],
      decorators: [],
    },
    createOneBase: {
      interceptors: [],
      decorators: [],
    },
    createManyBase: {
      interceptors: [],
      decorators: [],
    },
    updateOneBase: {
      interceptors: [],
      decorators: [],
    },
    replaceOneBase: {
      interceptors: [],
      decorators: [],
    },
    deleteOneBase: {
      interceptors: [],
      decorators: [],
    },
  },
})
// @CrudAuth({
//   property: 'user',
//   filter: (user: User) => ({
//     id: user.id,
//   }),
// })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override('getManyBase')
  getOneAndDoStuff(@ParsedRequest() req: CrudRequest) {
    console.log(req.parsed.filter);
    console.log(req.parsed.search);
    return this.base.getManyBase(req);
  }
}
