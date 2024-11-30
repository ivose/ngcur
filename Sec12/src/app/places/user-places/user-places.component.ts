import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  inFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.inFetching.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places', {
        //observe: 'event'
      })
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.error(error);
          return throwError(() => {
            new Error("Something went wrong fetching your favourite places. Please try again later.")
          })
        })
      )
      .subscribe({
        next: (places) => {
          //this.places.set(resData.places);//selle asemel pipe map
          this.places.set(places);
        },
        error: (error: Error) => {
          this.error.set(error.message);
        },
        complete: () => {
          this.inFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      console.log('Destroying AvailablePlacesComponent');
      subscription.unsubscribe();
    });
  }
}
