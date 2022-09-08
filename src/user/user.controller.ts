import { Body, Controller, Get, Post } from '@nestjs/common'
import { Roles } from 'src/auth/roles-auth.decorator'
import { ChangeRoleDto } from './dto/ChangeRole.dto'
import { CreateUserDto } from './dto/create_user.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}

    @Roles('USER')
    @Post()
    create(@Body() Dto: CreateUserDto) {
        return this.UserService.createUser(Dto)
    }

    @Roles('USER')
    @Get()
    GetUserByEmail(@Body('email') email: string) {
        return this.UserService.getUserByEmail(email)
    }

    @Post('/role')
    ChangeRole(@Body() dto: ChangeRoleDto) {
        return this.UserService.addRole(dto)
    }

    @Roles('USER')
    @Post('/updata')
    ChangeData(@Body() dto: UpdateUserDto) {
        return this.UserService.updateUser(dto)
    }
}
