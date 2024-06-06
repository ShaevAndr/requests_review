import { Injectable } from '@nestjs/common';
import { SessionsRepository } from './session.repository.dto';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '@/users/user.service';
import { generateSessionId } from '@/utils/session-utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly sessionsRepository: SessionsRepository,
        private readonly usersService: UserService
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.getUser(loginDto);
        const sessionId = generateSessionId();
        await this.sessionsRepository.create(sessionId, user);
        return sessionId;
    }

    async logout(sessionId: string) {
        await this.sessionsRepository.delete(sessionId);
    }

    async getSession(sessionId: string) {
        return await this.sessionsRepository.find(sessionId);
    }
}
