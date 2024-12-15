import { Directive, ElementRef, OnInit } from '@angular/core';
@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
    constructor(private elemntRef: ElementRef) {
    }

    ngOnInit() {
        this.elemntRef.nativeElement.style.backgroundColor = 'green';
    }
}