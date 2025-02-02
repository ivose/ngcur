import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.mode";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }
  signup(email: string, password: string) {
    //https://firebase.google.com/docs/reference/rest/auth
    return this.http.post<AuthResponseData>('https://googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]', {
      email, password, returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://googleapis.com/identitytoolkit/v3/relyingparty/veryfyPassword?key=[API_KEY]', {
      email, password, returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }

  private handleAuthentication(email: string, userId:string, token: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';

    }
    return throwError(errorMessage);
  }

}
