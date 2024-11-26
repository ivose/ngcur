import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    const subscription = interval(1000).subscribe({
      next: (value) => console.log(value),
      error: (err) => console.error(err),
      complete: () => console.log('Complete')
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}
