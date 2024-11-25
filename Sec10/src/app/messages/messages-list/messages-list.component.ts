import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, OnInit, DestroyRef } from '@angular/core';
import { MessagesService } from '../service.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  //messages = input.required<string[]>(); // teises html'is ei ole vaja <mesage-list /> attribuuti messages=".."
  private messageService = inject(MessagesService);
  messages = this.messageService.allMessages;

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
