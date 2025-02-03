import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement } from '../store/counter.actions';
import { AppState } from '../store/counter.state';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css']
})
export class CounterControlsComponent {
  constructor(private store: Store<AppState>) {}

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
}
