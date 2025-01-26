import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Output() firstObsSubsctiption: Subscription;

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
        if(count === 2) {
          observer.complete();
        }
        if(count>3) {
          observer.error(new Error("count is creater than 3"));
        }
        count++;
      }, 1000);
    });
    customIntervalObservable.pipe(filter((data:number) => {return data > 0}), map((data:number) => {
      return `Round: ${data + 1}`;
    }))
    this.firstSubscription = customIntervalObservable.subscribe(data=>{
      console.log(`Round: ${data + 1}`);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log("COMPLETED!")
    })
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();//ilma selleta uuesti sellele urlile tulles oleks ngOnInit'is topelt protsessid
  }

}
