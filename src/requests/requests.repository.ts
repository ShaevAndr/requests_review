import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma.service';
import { CreateRequestDto } from './dtos/request-create.dto';
import { Prisma, Statuses } from '@prisma/client';
import { UpdateRequestDto } from './dtos/update-request.dto';

@Injectable()
export class RequestsRepository {
    async findAll(params) {
        try {
            const { order, filter } = params;

            const query = prisma.request.findMany({
                orderBy: {
                    created_at: order === 'asc' ? 'asc' : 'desc',
                },
                where: {
                    ...(filter && { status: filter }),
                },
                select: {
                    id: true,
                    name: true,
                    email: false,
                    message: true,
                    created_at: true,
                    status: true
                }
            });

            return await query;

        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async create(createRequestDto: CreateRequestDto) {
        try {
            return await prisma.request.create({
                data: createRequestDto
            });
        } catch (e) {
            console.log(e);
            throw new HttpException('ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: number, filter?: Statuses, order?: Prisma.RequestOrderByWithRelationInput) {
        try {
            return await prisma.request.findUnique({ where: { id } })
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async update(id: number, updateRequestDto: UpdateRequestDto) {
        const request = await this.findOne(id);
        if (!request) {
            throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
        }
        return await prisma.request.update({
            where: { id },
            data: updateRequestDto
        });


    }
}