import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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
  constructor(private http: HttpClient) { }
  signup(email: string, password: string) {
    //https://firebase.google.com/docs/reference/rest/auth
    return this.http.post<AuthResponseData>('https://googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]', {
      email, password, returnSecureToken: true
    }).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occured!';
      if(!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
      }
      return throwError(errorMessage);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://googleapis.com/identitytoolkit/v3/relyingparty/veryfyPassword?key=[API_KEY]', {
      email, password, returnSecureToken: true
    })
  }

}
