import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({ example: 'abs@mail.com', description: 'email пользователя' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'qwerty', description: 'Пароль пользователя' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
