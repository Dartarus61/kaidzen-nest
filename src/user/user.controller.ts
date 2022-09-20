import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { BackupService } from 'src/backup/backup.service'
import { ChangeRoleDto } from './dto/ChangeRole.dto'
import { CreateUserDto } from './dto/create_user.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private UserService: UserService, private BackupService: BackupService) {}

    @UseGuards(RolesGuard)
    @Roles('USER')
    @Post('/create')
    create(@Body() Dto: CreateUserDto) {
        return this.UserService.createUser(Dto)
    }

    @UseGuards(RolesGuard)
    @Roles('USER')
    @Post()
    GetUserByEmail(@Body('email') email: string) {
        return this.UserService.getUserByEmail(email)
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post('/addrole')
    ChangeRole(@Body() dto: ChangeRoleDto) {
        return this.UserService.addRole(dto)
    }

    @UseGuards(RolesGuard)
    @Roles('USER', 'ADMIN')
    @Post('/updata')
    ChangeData(@Body() dto: UpdateUserDto) {
        return this.UserService.updateUser(dto)
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get('/all')
    AllPeople() {
        return this.UserService.getAll()
    }

    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get('/log')
    GetLogOfBackup() {
        return this.BackupService.GetLog()
    }
}
