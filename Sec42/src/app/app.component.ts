import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => hightlighted', animate(300)),
      transition('hightlighted => normal', animate(500)),
    ])
  ]
})
export class AppComponent {
  state = "normal";
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate(item) {
    this.state = this.state == 'normal' ? 'highlighted' : 'normal';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1)
  }
}
