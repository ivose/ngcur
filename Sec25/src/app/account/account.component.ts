import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  //providers: [LoggingService]//võetakse app.modules
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  //@Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingService: LoggingService, private AccountsService: AccountsService) {}

  onSetTo(status: string) {
    //this.statusChanged.emit({id: this.id, newStatus: status});
    this.AccountsService.updateStatus(this.id, status);
    //console.log('A server status changed, new status: ' + status);
    //this.loggingService.loginStatusChange(status);
  }
}
