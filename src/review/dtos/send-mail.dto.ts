import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMailDto {

    @ApiProperty({ example: '34', description: 'Идентификатор заявки' })
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({ example: 'Такое я никогда не подпишу!', description: 'Сообщение на почту автору' })
    @IsNotEmpty()
    @IsString()
    readonly emailBody: string;

}
