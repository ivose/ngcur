import { Component, computed, Inject, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksServiceToken } from '../../../../main';
import { Task, TASK_STATUS_OPTINS, TaskStatus } from '../../task.model';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  constructor(@Inject(TasksServiceToken) private tasksService: TasksService) {}
  
  taskStatusOptions = inject(TASK_STATUS_OPTINS);
  task = input.required<Task>();
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {

    let newStatus: TaskStatus;

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        newStatus = 'OPEN';
    }
    this.tasksService.updateTaskStatus(taskId, newStatus);
  }
}
