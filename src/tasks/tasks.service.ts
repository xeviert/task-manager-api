import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskHistory } from './task-history.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskHistory)
    private readonly taskHistoryRepository: Repository<TaskHistory>,
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (updateTaskDto.status && updateTaskDto.status !== task.status) {
      const taskHistory = new TaskHistory();
      taskHistory.oldStatus = task.status;
      taskHistory.newStatus = updateTaskDto.status;
      taskHistory.changeReason =
        updateTaskDto.changeReason || 'No reason provided';
      taskHistory.task = task;

      await this.taskHistoryRepository.save(taskHistory);
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.softDelete(id);
  }
}
