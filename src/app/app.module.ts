import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/users/user.module';
import { AuthModule } from '@/auth/auth.module';
import { RequestsModule } from '@/requests/requests.module';
import { CheckSessionMiddleware } from '@/auth/middleware/session.middleware';
import { APP_ROUTES } from '@/const/path.const';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), UserModule, AuthModule, RequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckSessionMiddleware).forRoutes({ path: `${APP_ROUTES.REVIEW}/*`, method: RequestMethod.ALL });
  }
} 
