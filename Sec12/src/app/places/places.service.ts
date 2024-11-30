import { ErrorService } from './../shared/error.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private ErrorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() { 
    return this.fetchData(
      'http://localhost:3000/places',
      "Something went wrong fetching available places. Please try again later."
    )
    // .pipe(tap({
    //   next: (userPlaces) => this.userPlaces.set(userPlaces)
    // }))
  }

  loadUserPlaces() {
    const prevPlaces = this.userPlaces();
    return this.fetchData(
      'http://localhost:3000/user-places',
      "Something went wrong fetching your favourite places. Please try again later."
    ).pipe(
      tap(places => this.userPlaces.set(places)),
      catchError(() => {
      this.userPlaces.set(prevPlaces);
      this.ErrorService.showError("Failed to load user places.");
      return throwError(() => new Error("Failed to load user places."))
    }))
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    //this.userPlaces.update((prevPlaces) => [...prevPlaces, placeId]);
    if(!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    }).pipe(catchError(error => {
      //this.userPlaces.set();
      return throwError(() => new Error("Failed to store selected place."))
    }))
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    return this.httpClient.delete('http://localhost:3000/user-places/'+place.id)
    .pipe(catchError(error => {
      this.userPlaces.set(prevPlaces);
      this.ErrorService.showError("Failed to remove selected place.");
      return throwError(() => new Error("Failed to remove selected place."))
    }));
   }

  private fetchData(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(errorMessage))
      })
    )
  }
}
