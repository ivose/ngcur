import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
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
export class NewTicketComponent {
  //@ViewChild('form') form?: ElementRef<HTMLFieldSetElement>;
  //private form = viewChild<ElementRef<HTMLFormElement>>('form');
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  onSubmit(titleElement: String, descriptionElement: String) {
    const title = titleElement;
    const description = descriptionElement;
    console.log('Submitted', title, description);
    //this.form?.nativeElement.remove();
    //this.form?.nativeElement.reset();//videos olnud reset ei toimi
    //this.form()?.nativeElement.reset();
    this.form().nativeElement.reset();//deklaratsioonis 'required'
  }
}
