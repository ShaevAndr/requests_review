import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import { CreateRequestDto } from './dtos/request-create.dto';
import { UpdateRequestDto } from './dtos/update-request.dto';
import { ParamsDto } from './dtos/get-params.dto';

@Injectable()
export class RequestsService {
    constructor(
        readonly requestsRepository: RequestsRepository
    ) { }

    async create(createRequestDto: CreateRequestDto) {
        return await this.requestsRepository.create(createRequestDto);
    }

    async findAll(params: ParamsDto) {
        return await this.requestsRepository.findAll(params);
    }

    async getRequest(id: number) {
        return await this.requestsRepository.findOne(id);
    }

    async update(id: number, data: UpdateRequestDto) {
        return await this.requestsRepository.update(id, data);
    }
}
