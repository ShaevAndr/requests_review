import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { MailService } from '@/mail/mail.service';
import { UserDto } from './dtos/user.dto';
import { generatePassword, hashPassword } from '@/utils/user-utils';
import { ChangePasswordtDto } from './dtos/change-pas.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly mailService: MailService,
    ) { }

    async create(createUserDto: UserDto) {
        const user = await this.usersRepository.findUser(createUserDto.email);
        if (user) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.CONFLICT);
        }
        createUserDto.password = await hashPassword(createUserDto.password)
        return await this.usersRepository.create(createUserDto);
    }

    async forgotPassword(email: string) {
        const user = await this.usersRepository.findUser(email);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        const newPassword = generatePassword();
        await this.usersRepository.update(email, newPassword);
        await this.mailService.sendEmail(email, 'Восстановление пароля', `Ваш новый пароль: ${newPassword}`);
    }

    async changePassword(changePasswordtDto: ChangePasswordtDto) {
        const user = await this.usersRepository.findUser(changePasswordtDto.email);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        const hashedPassword = await hashPassword(changePasswordtDto.password);
        if (hashedPassword !== user.password) {
            throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
        }
        const newPassword = await hashPassword(changePasswordtDto.newPassword);
        return await this.usersRepository.update(changePasswordtDto.email, newPassword);
    }

    async getUser(userDto: UserDto) {
        const user = await this.findUser(userDto.email);
        await this.checkPassword(user, userDto.password);
        return user;

    }

    private async findUser(email: string) {
        const user = await this.usersRepository.findUser(email);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    private async checkPassword(user: UserDto, password: string) {
        const hashedPassword = await hashPassword(password);
        if (hashedPassword !== user.password) {
            throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
        }
    }

}
