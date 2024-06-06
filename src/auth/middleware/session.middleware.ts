import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../auth.service";


@Injectable()
export class CheckSessionMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService,
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const sessionId = req.cookies['sessionId'];
        if (!sessionId) {
            throw new HttpException('нет сессии', HttpStatus.UNAUTHORIZED);
        }
        const session = await this.authService.getSession(sessionId);
        if (!session) {
            throw new HttpException('нет сессии', HttpStatus.UNAUTHORIZED);
        }
        next()
        return;
    }
}
