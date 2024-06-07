import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Statuses } from '@prisma/client';

export class ParamsDto {
    @ApiProperty({ enum: ['asc', 'desc'], description: 'Сортировка по дате' })
    @IsString()
    readonly order?: 'asc' | 'desc';

    @ApiProperty({ enum: [Statuses.active, Statuses.resolved], description: 'Фильтр по статусу' })
    @IsString()
    readonly filter?: Statuses;
}
