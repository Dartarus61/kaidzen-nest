import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Comment } from 'src/comment/comment.model'
import { User } from 'src/user/user.model'

interface PostCreationAttrs {
    description: string
    economic: string
    area_of_improvement: string
    filePath: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @Column({ type: DataType.STRING, allowNull: false })
    economic: string

    @Column({ type: DataType.STRING, allowNull: false })
    area_of_improvement: string

    @Column({ type: DataType.STRING, allowNull: false })
    accepted: string

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    solution_temp: boolean

    @Column({ type: DataType.STRING, allowNull: false })
    filePath: string

    @Column({ type: DataType.STRING, allowNull: true })
    fileName: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    author: User

    @HasMany(() => Comment)
    comments: Comment[]
}
