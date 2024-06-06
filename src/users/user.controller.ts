import { APP_ROUTES, USERS_ROUTES } from '@/const/path.const';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { ForgotPasswordtDto } from './dtos/forgot-pass.dto';
import { ChangePasswordtDto } from './dtos/change-pas.dto';

@ApiTags('API пользователя')
@Controller(APP_ROUTES.USER)
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'Создание нового пользователя' })
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post(USERS_ROUTES.REGISTR)
    async create(@Body() createRequestDto: UserDto) {
        await this.userService.create(createRequestDto);

    }

    @ApiOperation({ summary: 'Восстановление пароля' })
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post(USERS_ROUTES.FORGOT_PASSWORD)
    async forgotPassword(@Body() forgotPassword: ForgotPasswordtDto) {
        await this.userService.forgotPassword(forgotPassword.email);

    }

    @ApiOperation({ summary: 'Смена пароля' })
    @ApiResponse({ status: HttpStatus.CREATED })
    @Post(USERS_ROUTES.CHANGE_PASSWORD)
    async changePassword(@Body() changePasswordtDto: ChangePasswordtDto) {
        await this.userService.create(changePasswordtDto);

    }


}
