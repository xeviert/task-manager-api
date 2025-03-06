import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Entity()
export class TaskHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    enumName: 'task_status_enum',
  })
  oldStatus: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    enumName: 'task_status_enum',
  })
  newStatus: TaskStatus;

  @Column({ type: 'text', nullable: true })
  changeReason: string;

  @CreateDateColumn()
  changedAt: Date;

  @ManyToOne(() => Task, (task) => task.history)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column()
  taskId: string;
}
