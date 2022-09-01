import { Body, Controller, Post, UploadedFile } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { GetGroupOffers } from './dto/getGroupOffers.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Post('/create')
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image?: any) {
        return this.postService.createPost(dto, image)
    }

    @Post('/getoff')
    GetOffers(@Body('id') id: number) {
        return this.postService.GetOffersById(id)
    }

    @Post('/getgroup')
    GetGroupOffers(@Body() dto: GetGroupOffers) {
        return this.postService.GetGroupOffersByArea(dto)
    }

    @Post('/resolves')
    GetResolvesOffers(@Body('area_of_improvement') area_of_improvement: string) {
        return this.postService.GetResolveOffers(area_of_improvement)
    }
}
