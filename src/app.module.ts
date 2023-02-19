import { MiddlewareConsumer, Module, NestModule,} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddlewareMiddleware } from './middleware/cors-middleware/cors-middleware.middleware';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot({
    type:'mysql',
    host:'taskdb_container',
    port:3306,
    database:'task',
    username:'root',
    password:'',
    synchronize:true,
    autoLoadEntities:true
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    
    consumer.apply(CorsMiddlewareMiddleware).forRoutes('*');
  }
}
