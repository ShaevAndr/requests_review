import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/users/user.module';
import { SessionsRepository } from './session.repository';
import { CheckSessionMiddleware } from './middleware/session.middleware';

@Module({
  imports: [UserModule],
  providers: [AuthService, SessionsRepository, CheckSessionMiddleware],
  controllers: [AuthController],
  exports: [CheckSessionMiddleware, AuthService]

})
export class AuthModule { }
