import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable  = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });
    this.firstSubscription = customIntervalObservable.subscribe(data=>{
      console.log(data);
    })
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();//ilma selleta uuesti sellele urlile tulles oleks ngOnInit'is topelt protsessid
  }

}
