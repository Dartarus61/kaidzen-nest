import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Comment } from 'src/comment/comment.model'
import { FilesService } from 'src/files/files.service'
import { User } from 'src/user/user.model'
import { CreatePostDto } from './dto/create-post.dto'
import { GetGroupOffers } from './dto/getGroupOffers.dto'
import { Post } from './post.model'

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        @InjectModel(User) private userRepository: typeof User,
        private fileService: FilesService
    ) {}

    async createPost(dto: CreatePostDto, image?: any): Promise<object> {
        if (image) {
            const filePath = await this.fileService.createFile(image) //TODO: переделать загрузку файлов и добавление в бд пути до файлов
            const post = await this.postRepository.create({ ...dto, filePath })
            return post
        }
        const post = await this.postRepository.create({ ...dto })
        return post
    }

    async Offerconstruct(OfferArr: object[]) {
        let AreaOffers = []
        for (let index = 0; index < OfferArr.length; index++) {
            let ParseOffer = JSON.stringify(OfferArr[index], null, 2)
            AreaOffers.push(JSON.parse(ParseOffer))

            let user = await this.userRepository.findOne({
                where: { id: AreaOffers[index].userId },
                raw: true,
            })

            AreaOffers[index].Author = user.name + ' ' + user.surname + ' ' + user.secondname
            AreaOffers[index].Group = user.group
            if (!AreaOffers[index].Comments) continue

            for (let j = 0; j < AreaOffers[index].Comments.length; j++) {
                let boss = await this.userRepository.findOne({
                    where: { id: AreaOffers[index].Comments[j].userId },
                    raw: true,
                })

                AreaOffers[index].Comments[j].Name = boss.name + ' ' + boss.surname + ' ' + boss.secondname
            }
        }

        AreaOffers.sort((a, b) => a.id - b.id)
        return AreaOffers
    }

    async GetOffersById(id: number): Promise<object[]> {
        const user = await this.postRepository.findAll({ where: { userId: id }, include: [Comment] })
        if (!user) return []
        let myoffers = []
        for (let index = 0; index < user.length; index++) {
            let parsejson = JSON.stringify(user[index], null, 2)
            myoffers.push(JSON.parse(parsejson))

            if (!myoffers[index].Comments) continue

            for (let j = 0; j < myoffers[index].Comments.length; j++) {
                let boss = await this.userRepository.findOne({
                    where: { id: myoffers[index].Comments[j].userId },
                    raw: true,
                })

                myoffers[index].Comments[j].Name = boss.name + ' ' + boss.surname + ' ' + boss.secondname
            }
        }
        myoffers.sort((a, b) => a.id - b.id)
        return myoffers
    }

    async GetGroupOffersByArea(dto: GetGroupOffers): Promise<object[]> {
        const GroupOffers = await this.postRepository.findAll({
            where: { area_of_improvement: dto.area_of_improvement },
            include: [Comment],
        })
        let finalMas: object[] = []
        let MastersOffers = await this.Offerconstruct(GroupOffers)
        for (let index = 0; index < MastersOffers.length; index++) {
            if (!MastersOffers[index].Comments) {
                finalMas.push(MastersOffers[index])
                continue
            }
            for (let j = 0; j < MastersOffers[index].Comments.length; j++) {
                if (MastersOffers[index].Comments[j].userId == dto.userId) continue
                else {
                    finalMas.push(MastersOffers[index])
                    break
                }
            }
        }
        return finalMas
    }

    async GetResolveOffers(area_of_improvement: string) {
        const Offers = await this.postRepository.findAll({
            where: { area_of_improvement, [Op.or]: [{ accepted: 'true' }, { accepted: 'false' }] },
            include: [Comment],
        })
        return this.Offerconstruct(Offers)
    }
}
