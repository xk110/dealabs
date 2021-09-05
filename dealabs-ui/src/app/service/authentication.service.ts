import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User } from '../login/user-model';
import { SignUpForm } from '../login/signUpForm-model';
import { LoginForm } from '../login/loginForm-model';
import { Observable, Subject } from 'rxjs';
import { JwtResponse } from '../auth/jwt-response';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  itemValue = new Subject<string>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  private loginUrl = 'api/signin';
  private signupUrl = 'api/signup';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
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


  loginlogout(name: string) {
    this.itemValue.next(name);
  }

  logOut() {
    sessionStorage.clear();
    this.loginlogout("Connexion");
    this.messageService.add({
      key: 'myToast',
      severity: 'success',
      summary: 'Déconnexion',
      detail: 'Déconnexion effectuée avec succès'
    });
    //window.location.reload();
  }
}