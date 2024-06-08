import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { APP_ROUTES, REQUESTS_ROUTES } from 'src/const/path.const';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from './dtos/request-create.dto';
import { ParamsDto } from './dtos/get-params.dto';

@ApiTags('Обработка заявок')
@Controller(APP_ROUTES.REQUESTS)
export class RequestsController {
    constructor(
        private readonly requestsService: RequestsService
    ) { }

    @ApiOperation({ summary: 'Создание новой заявки' })
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post(REQUESTS_ROUTES.CREATE)
    async create(@Body() createRequestDto: CreateRequestDto) {
        await this.requestsService.create(createRequestDto);
    }

    @ApiOperation({ summary: 'Получение заявок' })
    @ApiQuery({
        name: 'params',
        required: false,
        type: ParamsDto,
        description: 'Возможные значения: filter (выборка по статусу), order (сортировка по времени создания)',
    })
    @ApiResponse({ status: HttpStatus.OK })
    @Get(REQUESTS_ROUTES.GET)
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() params?: Partial<ParamsDto>) {
        return await this.requestsService.findAll(params);
    }
}
