import { Body, Controller, Post } from '@nestjs/common'
import { Roles } from 'src/auth/roles-auth.decorator'
import { CommentService } from './comment.service'
import { SetComment } from './dto/comment.dto'

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Roles('CHIEF')
    @Post('/setfalse')
    SetFalseComment(@Body() dto: SetComment) {
        return this.commentService.setFalseComment(dto)
    }

    @Roles('CHIEF')
    @Post('/setagreed')
    SetAgreedComment(@Body() dto: SetComment) {
        return this.commentService.setAgreedComment(dto)
    }
}
