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
  //actions: string[] = [];
  actions = signal<string[]>([]);
  counter = signal(0);

  increment() {
    //this.counter++;
    this.counter.set(this.counter() + 1);
    //this.actions.push('INCREMENT')
    this.actions.mutate((oldActions) => oldActions.push('INCREMENT'));
  }

  decrement() {
    //this.counter--;
    this.counter.set(this.counter() - 1);
    //this.actions.push('DECREMENT'):
    this.actions.update((oldActions) => [...oldActions, 'CECREMENT']);
  }
}
