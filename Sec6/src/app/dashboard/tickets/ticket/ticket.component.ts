import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../tickets.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
 // @Input() ticket: Ticket;

 data = input.required<Ticket>({});
 close = output({alias: 'closeTicket'});// html'is (click) mõlemad close and closeTicket
 detailsVisible = signal(false);

 onToggleDetails() {
   //this.detailsVisible.set(!this.detailsVisible);
   this.detailsVisible.update((wasVisible) => !wasVisible);
 }

 onMarkAsCompleted() {
  this.close.emit();
 }
}
