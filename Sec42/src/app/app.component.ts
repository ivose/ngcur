import { animate, keyframes, state, style, transition, trigger, group } from '@angular/animations';
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
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(500)),
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => hightlighted', animate(300)),
      transition('hightlighted => normal', animate(800)),
      // transition('shrunken <=> *', animate(500, style({
      //   borderRadius: '50px',
      // }))),
      transition('shrunken <=> *', [
        style({ 'background-color': 'orange' }),
        animate(1000, style({ borderRadius: '50px' })),
        animate(500),
      ]),
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0,
        }))
      ]),
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(300, keyframes([
          style({ opacity: 0, offset: 0, transform: 'translateX(-100px)' }),
          style({ opacity: 0.5, offset: 0.3, transform: 'translateX(-50px)' }),
          style({ opacity: 1, offset: 0.8, transform: 'translateX(-20px)' }),
          style({ opacity: 1, offset: 1, transform: 'translateX(0px)' })
        ]))
      ]),
      transition('* => void', [
        group([
          animate(300, style({ color: 'red' })),
          animate(300, style({ transform: 'translateX(100px)', opacity: 0 }))
        ]),
      ]),
    ]),
  ]
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  animationStarted(event: any) {
    console.log(event);
  }

  animationEnded(event: any) {
    console.log(event);
  }

  onAdd(item: string) {
    this.list.push(item);
  }

  onDelete(item: string) {
    this.list.splice(this.list.indexOf(item), 1);
  }
}
