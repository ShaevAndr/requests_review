import { MailService } from '@/mail/mail.service';
import { RequestsService } from '@/requests/requests.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Statuses } from '@/requests/types/statuses.type';

@Injectable()
export class ReviewService {
    constructor(
        private readonly requestsService: RequestsService,
        private readonly mailService: MailService
    ) { }

    async sendComment(id: number, comment: string) {
        const request = await this.requestsService.getRequest(id);
        if (!request) {
            throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
        }
        await this.mailService.sendEmail(request.email, 'Новый комментарий', comment);
    }

    async confirmRequest(id: number, comment: string) {
        const request = await this.requestsService.getRequest(id);
        if (!request) {
            throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
        }
        await this.mailService.sendEmail(request.email, 'Новый комментарий', comment);
        await this.requestsService.update(id, { status: Statuses.resolved, comment });
    }

}
