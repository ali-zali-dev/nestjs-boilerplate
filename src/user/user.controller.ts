import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
@Crud({
  model: {
    type: User,
  },
})
@ApiTags('user')
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
