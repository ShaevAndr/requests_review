import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Statuses } from '../types/statuses.type';

export class ParamsDto {
    @ApiProperty({ enum: ['asc', 'desc'], description: 'Сортировка по дате' })
    @IsString()
    readonly order?: Order

    @ApiProperty({ enum: [Statuses.active, Statuses.resolved], description: 'Фильтр по статусу' })
    @IsString()
    readonly filter?: Statuses;
}

export type Order = 'asc' | 'desc';