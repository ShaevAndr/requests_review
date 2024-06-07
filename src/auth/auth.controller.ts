import { APP_ROUTES, AUTH_ROUTES } from '@/const/path.const';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@ApiTags('Сервис аунтефикации')
@Controller(APP_ROUTES.AUTH)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: HttpStatus.OK })
    @Post(AUTH_ROUTES.LOGIN)
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto, @Res() res) {
        const sessionId = await this.authService.login(loginDto);
        res.cookie('sessionId', sessionId, { httpOnly: true });
        return res.send('Logged in');
    }

    @ApiOperation({ summary: 'Logout' })
    @ApiResponse({ status: HttpStatus.OK })
    @Get(AUTH_ROUTES.LOGOUT)
    @HttpCode(HttpStatus.OK)
    async logout(@Res() res, @Req() req) {
        console.log(req.cookies);
        const sessionId = req.cookies['sessionId'];

        await this.authService.logout(sessionId);
        res.clearCookie('sessionId');
        return res.send('Logged out');
    }


}

