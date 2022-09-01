import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Comment } from 'src/comment/comment.model'
import { Post } from 'src/post/post.model'
import { Role } from 'src/role/role.model'
import { UserRoles } from 'src/role/user-roles.model'

interface UserCreationAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    surname: string

    @Column({ type: DataType.STRING, allowNull: false })
    secondname: string

    @Column({ type: DataType.STRING, allowNull: false })
    group: string

    @Column({ type: DataType.STRING, allowNull: true })
    area_of_improvement: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isActivated: boolean

    @Column({ type: DataType.STRING, allowNull: true })
    acticationLink: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}
