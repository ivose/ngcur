import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ServerElementComponent implements OnInit {

  // @Input() <app-server-element *ngFor="let serverElement of serverElements" [element]="serverElement"></app-server-element>, [element] väärtuse saamiseks

  @Input('srvElement') element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }


}
