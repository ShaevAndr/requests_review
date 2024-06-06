import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordtDto {

    @ApiProperty({ example: 'abs@mail.com', description: 'email пользователя' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

}
