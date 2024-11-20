import { DestroyRef } from '@angular/core';
import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  //private interval?: ReturnType<typeof setInterval>;
  private destroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit() {
    console.log('ServerStatusComponent initialized');
    const interval = setInterval(() => {
      const rnd = Math.random();
      this.currentStatus = rnd > 0.5 ? 'online' : (rnd > 0.2 ? 'offline' : 'unknown');
    }, 1000);
    this.destroyRef.onDestroy(() => {
      console.log('ServerStatusComponent destroyed');
      clearInterval(interval);
    });
  }

  ngAfterViewInit() {
    console.log('ServerStatusComponent ngAfterViewInit');
  }



}
