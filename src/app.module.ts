import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { JournalModule } from './journal/journal.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: '',
      password: '',
      authSource: 'admin',
      database: 'myJournal',
      entities: [join(__dirname, '**/**.entity.ts')],
      useUnifiedTopology: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    JournalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
