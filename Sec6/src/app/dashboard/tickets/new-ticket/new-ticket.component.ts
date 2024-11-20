import { AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit, AfterViewInit{
  @ViewChild('form') form?: ElementRef<HTMLFieldSetElement>;
  //private form = viewChild<ElementRef<HTMLFormElement>>('form');
  //private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  //@Output() add = new EventEmitter
  add = output<{title: string, text: string}>();
  enteredTitle = '';
  enteredText = '';

  ngOnInit(): void {
    console.log('ONINIT');
  }

  ngAfterViewInit(): void {
    console.log('AFTER View INTI');
    console.log(this.form?.nativeElement);
  }


  onSubmit() {
    const title = this.enteredTitle;
    const description = this.enteredText;
    console.log('Submitted', title, description);
    this.form?.nativeElement.remove();
    //this.form?.nativeElement.reset();//videos olnud reset ei toimi
    //this.form()?.nativeElement.reset();
    //this.form().nativeElement.reset();//deklaratsioonis 'required'
    this.add.emit({title, text: description});
    this.enteredTitle = '';
    this.enteredText = '';
  }
}
