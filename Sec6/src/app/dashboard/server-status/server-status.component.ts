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

  constructor() {}
  ngOnInit() {
    setInterval(() => {
      const rnd = Math.random();
      this.currentStatus = rnd > 0.5 ? 'online' : (rnd > 0.2 ? 'offline' : 'unknown');
    }, 1000);
    this.currentStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
}
