import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Task } from './task.model';
//ng g c tasks/task --skip-tests
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({required: true}) task!: Task;
  @Output() complete = new EventEmitter<string>()
  onCompleteTask() {
    this.complete.emit(this.task.id);
  }
}
