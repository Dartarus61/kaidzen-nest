import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import { User } from './user/user.model'
import { PostModule } from './post/post.module'
import * as path from 'path'
import { Post } from './post/post.model'
import { RoleModule } from './role/role.module'
import { Role } from './role/role.model'
import { UserRoles } from './role/user-roles.model'
import { FilesModule } from './files/files.module'
import { CommentModule } from './comment/comment.module'
import { Comment } from './comment/comment.model'

@Module({
    imports: [
        UserModule,
        AuthModule,
        ConfigModule.forRoot({
            envFilePath: `.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'rekaid',
            models: [User, Post, Role, UserRoles, Comment],
            autoLoadModels: true,
        }),
        PostModule,
        RoleModule,
        FilesModule,
        CommentModule,
    ],
})
export class AppModule {}
