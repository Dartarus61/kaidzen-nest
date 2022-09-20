import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../user/dto/create_user.dto'
import { ResetPassDto } from './dto/respass.dto'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @Post('/registration')
    reg(@Body() dto: CreateUserDto) {
        return this.AuthService.reg(dto)
    }

    @Post('/login')
    login(@Body() dto: LoginDto) {
        return this.AuthService.login(dto)
    }

    @Post('/logout')
    logout(@Body('RefreshToken') token: string) {
        return this.AuthService.logout(token)
    }

    @Post('/reset')
    ResetPass(@Body() dto: ResetPassDto) {
        return this.AuthService.reset(dto)
    }
}
