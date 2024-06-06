import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {

    @ApiProperty({ example: 'Андрей', description: 'Имя пользователя' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 'abs@mail.com', description: 'email пользователя' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'Возьмите меня на работу', description: 'Сообщение пользователя' })
    @IsString()
    @IsNotEmpty()
    readonly message: string;
}
