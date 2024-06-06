import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma.service';
import { CreateRequestDto } from './dtos/request-create.dto';

@Injectable()
export class RequestsRepository {
    async findAll() {
        try {
            return await prisma.request.findMany();
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

    private async findOne(id: number) {
        try {
            return await prisma.request.findUnique({ where: { id } })
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async update(id: number, updateRequestDto: Partial<CreateRequestDto>) {
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