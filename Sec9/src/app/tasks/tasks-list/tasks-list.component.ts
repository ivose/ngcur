import { Component, computed, inject, signal } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTINS, TaskStatusOptions, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  private tasksService = inject(TasksServiceToken);
  selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTINS);
  tasks = computed(() => {
    const filter = this.selectedFilter();
    const allTasks = this.tasksService.allTasks();
    switch (filter) {
      case 'open':
        return allTasks.filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return allTasks.filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return allTasks.filter((task) => task.status === 'DONE');
      default:
        return allTasks;
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
