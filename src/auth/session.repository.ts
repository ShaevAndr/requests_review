import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma.service';
import { LoginDto } from './dtos/login.dto';


@Injectable()
export class SessionsRepository {
    async findUser(email: string) {
        try {
            return await prisma.user.findUnique({ where: { email } });
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async create(sessionId: string, user: LoginDto) {
        try {
            return await prisma.session.create({
                data: { session: sessionId, user_email: user.email }
            });
        } catch (e) {
            console.log(e);
            throw new HttpException('ошибка создания сессии', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(sessionId: string) {
        try {

            return await prisma.session.delete({
                where: { session: sessionId },
            });
        } catch (e) {
            console.log(e);
            throw new HttpException('ошибка удаления сессии', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async find(session: string) {
        try {
            return await prisma.session.findUnique({
                where: { session: session },
            });

        } catch (e) {
            console.log('Error', e);
            return null;
        }
    }


}