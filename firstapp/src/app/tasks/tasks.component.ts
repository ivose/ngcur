import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NgFor ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  //@Input({required:true}) name!: string;
  @Input({required:true}) userId!: string;
  @Input({required:true}) name!: string;
  tasks = DUMMY_TASKS;
  get selectedUserTasks() {
    return this.tasks.filter(task => task.userId === this.userId);
  }
  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
