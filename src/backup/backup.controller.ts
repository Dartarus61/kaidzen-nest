import { Controller, Get, UseGuards } from '@nestjs/common'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { BackupService } from './backup.service'

@Controller('backup')
export class BackupController {
    constructor(private backupService: BackupService) {}

    @Get()
    GetMy() {
        return this.backupService.GetLog()
    }
}
