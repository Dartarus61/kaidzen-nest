import { Body, Controller, Post } from '@nestjs/common'
import { CommentService } from './comment.service'
import { SetComment } from './dto/comment.dto'

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post('/setfalse')
    SetFalseComment(@Body() dto: SetComment) {
        return this.commentService.setFalseComment(dto)
    }

    @Post('/setagreed')
    SetAgreedComment(@Body() dto: SetComment) {
        return this.commentService.setAgreedComment(dto)
    }
}
