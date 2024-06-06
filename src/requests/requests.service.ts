import { Injectable } from '@nestjs/common';
import { RequestsRepository } from './requests.repository';
import { CreateRequestDto } from './dtos/request-create.dto';

@Injectable()
export class RequestsService {
    constructor(
        readonly requestsRepository: RequestsRepository
    ) { }

    async create(createRequestDto: CreateRequestDto) {
        return await this.requestsRepository.create(createRequestDto);
    }

    async findAll() {
        return await this.requestsRepository.findAll();
    }


}
