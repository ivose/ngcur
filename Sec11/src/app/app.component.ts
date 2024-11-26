import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  interval = signal(0);
  doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);
  constructor() {
    effect(() => {
      console.log(`Click count: ${this.clickCount()}`);
    });
  }
  ngOnInit() {
    setInterval(() => {
      this.interval.update(i => i + 1);
    });
    // const subscription = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (value) => console.log(value),
    //   error: (err) => console.error(err),
    //   complete: () => console.log('Complete')
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  onClick() {
    this.clickCount.update(c => c + 1);
  }

}
