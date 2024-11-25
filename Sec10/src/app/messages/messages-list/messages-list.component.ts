import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, OnInit, DestroyRef } from '@angular/core';
import { MessagesService } from '../service.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
  //messages = input.required<string[]>(); // teises html'is ei ole vaja <mesage-list /> attribuuti messages=".."
  private messageService = inject(MessagesService);
  private cdRef = inject(ChangeDetectorRef);
  private DestroyRef = inject(DestroyRef);

  messages: string[] = [];

  //get messages() {
  //  return this.messageService.getAllMessages();
  //}

  ngOnInit(): void {
    const subscription = this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    });
    this.DestroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
