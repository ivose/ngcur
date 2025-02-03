import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/counter.state';
import { selectCount } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent {
  count$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
  }
}
