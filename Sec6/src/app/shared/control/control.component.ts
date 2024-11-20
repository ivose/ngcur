import { AfterContentInit, afterNextRender, afterRender, Component, contentChild, ContentChild, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, ///css failides button, textarea jt asemele :host.
  host: {//või new-ticket-component.html fili  <app-control class="control" label="Request">..
    class: 'control',
    '(click)' : 'onClick()'
  }
})
export class ControlComponent implements AfterContentInit{
  //className='control';//või
  //@HostBinding() class='control';//või
  //@HostBinding('class') className='control';//või (vist)
  label = input.required<string>();
  private el = inject(ElementRef);
  //@ContentChild('input') private control?: ElementRef<
  //  HTMLInputElement | HTMLTextAreaElement
  //>;
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    afterRender(() => {
      console.log('Rendered');
    });
    afterNextRender(() => {
      console.log('Next Rendered');
    });
  }

  ngAfterContentInit(): void {
    console.log('Content', this.control());
  }
  @HostListener('click')
  onClick() {
    console.log('Clicked');
    //console.log(this.el.nativeElement);
    console.log(this.el);
    console.log(this.control());
  }
}
