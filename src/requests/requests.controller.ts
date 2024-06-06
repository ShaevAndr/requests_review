import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { APP_ROUTES, REQUESTS_ROUTES } from 'src/const/path.const';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from './dtos/request-create.dto';
import { STATUS_CODES } from 'http';

@ApiTags('Обработка заявок')
@Controller(APP_ROUTES.REQUESTS)
export class RequestsController {
    constructor(
        private readonly requestsService: RequestsService
    ) { }

    @ApiOperation({ summary: 'Создание новой заявки' })
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post(REQUESTS_ROUTES.CREATE)
    create(@Body() createRequestDto: CreateRequestDto) {
        await this.requestsService.create(createRequestDto);
    }
}
