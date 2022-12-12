import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    database:'task',
    username:'root',
    password:'root',
    synchronize:true,
    autoLoadEntities:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
