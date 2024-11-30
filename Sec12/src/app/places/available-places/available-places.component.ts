import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, subscribeOn, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  inFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  // constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.inFetching.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places', {
        //observe: 'event'
      })
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.error(error);
          return throwError(() => {
            new Error("Couldn't fetch places")
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

  onSelectPlace(selectedPlace: Place) {
    this.httpClient.put('http://localhost:3000/user-places', {
      placeId: selectedPlace.id,
    }).subscribe({
      next: (resData) => console.log(resData)
    });
  }
}
