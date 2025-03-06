import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'werq-task-manager',
      entities: [Task],
      synchronize: true,
    }),
    TasksModule,
    // We'll add the TasksModule here later
  ],
})
export class AppModule { }
