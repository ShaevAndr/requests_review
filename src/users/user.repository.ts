import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma.service';
import { UserDto } from './dtos/user.dto';


@Injectable()
export class UsersRepository {
    async findUser(email: string) {
        try {
            return await prisma.user.findUnique({ where: { email } });
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async create(createUserDto: UserDto) {
        try {
            return await prisma.user.create({
                data: createUserDto
            });
        } catch (e) {
            console.log(e);
            throw new HttpException('ошибка создания пользователя', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(email: string, newPassword: string) {
        const user = await this.findUser(email);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        return await prisma.user.update({
            where: { email },
            data: {
                password: newPassword
            }
        });


    }
}