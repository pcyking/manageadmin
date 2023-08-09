import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from 'libs/db/src';

@Global()
@Module({
  imports: [DbModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
