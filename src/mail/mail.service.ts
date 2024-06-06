import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    async sendEmail(to: string, subject: string, text: string) {
        try {
            console.log('Отправка письма');
            return Promise.resolve('ok')
        } catch (e) {
            console.log(e);
            throw new HttpException('ошибка отправки письма', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
