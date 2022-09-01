import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Post } from 'src/post/post.model'
import { SetComment } from './dto/comment.dto'

@Injectable()
export class CommentService {
    constructor(@InjectModel(Post) private postRepository: typeof Post) {}

    async setFalseComment(dto: SetComment) {
        const NewComment = await this.postRepository.findOne({ where: { id: dto.postId } })
        await NewComment.$create('comments', { description: dto.ctx, userId: dto.userId })
        NewComment.update({ solution_temp: false })
        return NewComment
    }

    async setAgreedComment(dto: SetComment) {
        const NewComment = await this.postRepository.findOne({ where: { id: dto.postId } })
        await NewComment.$create('comments', { description: dto.ctx, userId: dto.userId })
        return NewComment
    }
}
