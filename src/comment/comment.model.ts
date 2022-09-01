import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Post } from 'src/post/post.model'
import { User } from 'src/user/user.model'

interface PostCreationAttrs {
    description: string
    economic: string
    area_of_improvement: string
    filePath: string
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER })
    postId: number

    @BelongsTo(() => Post)
    post: Post
}
