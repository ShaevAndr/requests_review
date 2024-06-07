import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { RequestsModule } from '@/requests/requests.module';
import { MailModule } from '@/mail/mail.module';

@Module({
  imports: [RequestsModule, MailModule],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule { }
