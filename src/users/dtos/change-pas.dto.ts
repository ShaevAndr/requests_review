import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordtDto {

    @ApiProperty({ example: 'abs@mail.com', description: 'email пользователя' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'qwerty', description: 'Пароль пользователя' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ example: 'qwerty', description: 'Новый пароль пользователя' })
    @IsString()
    @IsNotEmpty()
    readonly newPassword: string;
}
