export class CreateUserDto {
    readonly email: string
    readonly password: string
    readonly id: number
    readonly isActivated: boolean
    readonly name: string
    readonly surname: string
    readonly secondname: string
    readonly group: string
    readonly role: string
    readonly area_of_improvement: string
}
