import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, ///css failides button, textarea jt asemele :host.
  host: {//või new-ticket-component.html fili  <app-control class="control" label="Request">..
    class: 'control'
  }
})
export class ControlComponent {
  label = input.required<string>();
}
