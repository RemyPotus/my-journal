import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JournalModule } from './journal/journal.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, JournalModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
