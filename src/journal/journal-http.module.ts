import { Module } from '@nestjs/common';
import { JournalModule } from './journal.module';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';

@Module({
  imports: [JournalModule],
  providers: [JournalService],
  controllers: [JournalController],
})
export class UserHttpModule {}
