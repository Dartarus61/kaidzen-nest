export class UpdateUserDto {
  id: number;
  readonly login: string;
  readonly name: string;
  readonly surname: string;
  readonly secondname: string;
  readonly group: string;
}
