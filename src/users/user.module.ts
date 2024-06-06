import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailModule } from '@/mail/mail.module';
import { UsersRepository } from './user.repository';

@Module({
  imports: [MailModule],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UserService]
})
export class UserModule { }
