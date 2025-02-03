import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class SignalsComponent {
  actions: string[] = [];
  counter = signal(0);

  increment() {
    //this.counter++;
    this.counter.update((oldCounter) => oldCounter + 1);
    this.actions.push('INCREMENT')
  }

  decrement() {
    //this.counter--;
    this.counter.update((oldCounter) => oldCounter - 1);
    this.actions.push('DECREMENT'):
  }
}
