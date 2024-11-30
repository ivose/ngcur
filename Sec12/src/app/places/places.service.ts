import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() { 
    return this.fetchData(
      'http://localhost:3000/places',
      "Something went wrong fetching available places. Please try again later."
    )
  }

  loadUserPlaces() {
    return this.fetchData(
      'http://localhost:3000/user-places',
      "Something went wrong fetching your favourite places. Please try again later."
    ).pipe(tap({
      next: (userPlaces) => this.userPlaces.set(userPlaces)
    }))
  }

  addPlaceToUserPlaces(place: Place) {
    //this.userPlaces.update((prevPlaces) => [...prevPlaces, placeId]);
    const prevPlaces = this.userPlaces();
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

  removeUserPlace(place: Place) { }

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
