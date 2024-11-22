import { Directive } from "@angular/core";

@Directive({
    selector: 'a[appSafeLinks]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeaveMessage($event)'
    }
})
export class SafeLinksDirective {
    constructor() {
        console.log('SafeLinksDirective constructor');
    }

    onConfirmLeaveMessage(event: MouseEvent) {
        const wantsToLEaeve = window.confirm('Are you sure you want to leave?');
        if(wantsToLEaeve) {
            return;
        }
        event.preventDefault();
    }
}