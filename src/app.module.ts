import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { TaskHistory } from './tasks/task-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'werq-task-manager',
      entities: [Task, TaskHistory],
      synchronize: false,
      logging: ['schema'],
    }),
    TasksModule,
  ],
})
export class AppModule { }
