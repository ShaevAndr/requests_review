import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmRequestDto {

    @ApiProperty({ example: '34', description: 'Идентификатор заявки' })
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({ example: 'А такое подпишу!', description: 'Коментарий в заявке при подтверждении' })
    @IsNotEmpty()
    @IsString()
    readonly comment: string;

}
