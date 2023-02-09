import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { Journal } from './journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  exports: [TypeOrmModule],
  providers: [JournalService],
  controllers: [JournalController],
})
export class JournalModule {}
