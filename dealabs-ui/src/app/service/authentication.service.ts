import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User } from '../login/user-model';
import { SignUpForm } from '../login/signUpForm-model';
import { LoginForm } from '../login/loginForm-model';
import { Observable } from 'rxjs';
import { JwtResponse } from '../auth/jwt-response';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  private loginUrl = 'api/v1/signin';
  private signupUrl = 'api/v1/signup';

  constructor(
    private http: HttpClient
  ) {
  }


  signUp(signUpForm: SignUpForm): Observable<string> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post<string>(this.signupUrl, signUpForm, requestOptions);
  }

  signIn(loginForm: LoginForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, loginForm, this.httpOptions);
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}