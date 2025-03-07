import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  status?: TaskStatus;
  changeReason?: string;
}
