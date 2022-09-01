import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChangeRoleDto } from './dto/ChangeRole.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post()
  create(@Body() Dto: CreateUserDto) {
    return this.UserService.createUser(Dto);
  }

  @Get()
  GetUserByEmail() {
    return this.UserService.getAll();
  }

  @Post('/role')
  ChangeRole(@Body() dto: ChangeRoleDto) {
    return this.UserService.addRole(dto);
  }

  @Post('/updata')
  ChangeData(@Body() dto: UpdateUserDto) {
    return this.UserService.updateUser(dto);
  }
}
