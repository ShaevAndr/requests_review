import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { SendMailDto } from './dtos/send-mail.dto';
import { APP_ROUTES, REVIEW_ROUTES } from '@/const/path.const';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfirmRequestDto } from './dtos/confirm.dto';

@Controller(APP_ROUTES.REVIEW)
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService
    ) { }

    @ApiOperation({ summary: 'Отправка комментария на почту автору' })
    @ApiResponse({ status: HttpStatus.OK })
    @HttpCode(HttpStatus.OK)
    @Post(REVIEW_ROUTES.FEEDBACK)
    async sendComment(@Body() data: SendMailDto) {
        await this.reviewService.sendComment(data.id, data.emailBody);
    }

    @ApiOperation({ summary: 'Отправка комментария на почту автору' })
    @ApiResponse({ status: HttpStatus.OK })
    @HttpCode(HttpStatus.OK)
    @Post(REVIEW_ROUTES.RESOLVED)
    async confirmRequst(@Body() data: ConfirmRequestDto) {
        await this.reviewService.confirmRequest(data.id, data.comment);
    }
}
