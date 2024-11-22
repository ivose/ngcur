import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLinks]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeaveMessage($event)'
    }
})
export class SafeLinksDirective {
    queryParam = input('myapp', {alias: 'appSafeLinks'});
    private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
    constructor() {
        console.log('SafeLinksDirective constructor');
    }

    onConfirmLeaveMessage(event: MouseEvent) {
        const wantsToLEaeve = window.confirm('Are you sure you want to leave?');
        if(wantsToLEaeve) {
            //const address = (event.target as HTMLAnchorElement).href;
            const address = this.hostElement.nativeElement.href;
            //(event.target as HTMLAnchorElement).href = address + '?from='+this.queryParam;
            this.hostElement.nativeElement.href = address + '?from='+this.queryParam;
            return;
        }
        event.preventDefault();
    }
}