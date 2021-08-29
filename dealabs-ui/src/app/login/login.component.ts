import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observer } from 'rxjs';
import { JwtResponse } from '../auth/jwt-response';
import { DealService } from '../deal/deal.service';
import { AuthenticationService } from '../service/authentication.service';
import { TokenStorageService } from '../service/token-storage-service.service';
import { LoginForm } from './loginForm-model';
import { SignUpForm } from './signUpForm-model';
import { User } from './user-model';

// export type loginAction = 'register' | 'signIn' | 'forgotPassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public form: FormGroup;
  // public registerForm: FormGroup;
  // public login: boolean = true;
  // public register: boolean = false;

  private signUpForm: SignUpForm = {
    username: '',
    email: '',
    role: [],
    password: ''
  };
  private loginForm: LoginForm = {
    username: '',
    password: ''
  };

  private username: FormControl;
  private email: FormControl;
  private password: FormControl;
  // private invalidLogin = false;
  // private newEmail: FormControl;
  // private newPassword: FormControl;

  // public errorCode = null;
  // public progress = false;
  // public showPassword = false;
  public page: string;
  public submitButton: string;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private loginservice: AuthenticationService,
    private tokenStorage: TokenStorageService,
    public dialog: DynamicDialogRef
  ) {
    // Individual form controls
    this.username = new FormControl(null, Validators.required);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, Validators.required);
    // this.newEmail = new FormControl(null, [Validators.required, Validators.email]);
    // this.newPassword = new FormControl(null, Validators.required);

    // Empty form group
    this.form = new FormGroup({});

    this.page = "signIn";

    this.submitButton = "Connexion";
    // this.button2="Créer un compte";
  }

  ngOnInit(): void {

    this.switchPage(this.page);

  }

  onSubmit() {
    switch (this.page) {
      case 'signUp':
        console.log(this.form.get('username')?.value);
        this.signUpForm.username = this.form.get('username')?.value;
        this.signUpForm.email = this.form.get('email')?.value;
        this.signUpForm.password = this.form.get('password')?.value;
        this.signUpForm.role[0] = "user";

        console.log("signUp")
        const signUpObserver: Observer<string> = {
          next: data => {
            console.log("data : " + data)
            this.router.navigate([''])
            // this.invalidLogin = false
          },
          error: err => {
            console.log("error")
            console.log(err.error)
            this.messageService.add({
              key: 'myToast',
              severity: 'error',
              summary: "signup",
              detail: err.error.message,
              life: 5000
            })

          },
          complete: () => {
            console.log("complete")
            this.messageService.add({
              key: 'myToast',
              severity: 'success',
              summary: 'signup',
              detail: 'signup_successful'
            });
            this.dialog.close();
          }
        };
        // this.cleanTable(table);

        this.loginservice.signUp(this.signUpForm).subscribe(signUpObserver);




        break;
      case 'signIn':
        this.loginForm.username = this.form.get('username')?.value;
        this.loginForm.password = this.form.get('password')?.value;

        const signInObserver: Observer<JwtResponse> = {
          next: data => {
            console.log("data.accessToken : " + data.accessToken);
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUsername(data.username);
            this.tokenStorage.saveAuthorities(data.authorities);
          },
          error: err => {
            console.log(err.error.message)
            this.messageService.add({
              key: 'myToast',
              severity: 'error',
              summary: "signin",
              detail: err.error.message,
              life: 5000
            })

          },
          complete: () => {
            this.messageService.add({
              key: 'myToast',
              severity: 'success',
              summary: 'signin',
              detail: 'signin_successful'
            });
            this.dialog.close();
          }
        };

        this.loginservice.signIn(this.loginForm).subscribe(signInObserver);
        break;

      default:
        console.error('Invalid login page requested:', this.page);
    }
  }

  public switchPage(page: string) {
    // Resets the status
    // this.showPassword = this.progress = false;
    // this.errorCode = null;

    this.form = this.fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // this.form.reset();

    // Removes all the controls from the form group
    Object.keys(this.form.controls).forEach(control => {
      this.form.removeControl(control);
    });

    // this.username.setValue("");
    // this.email.setValue("");
    // this.password.setValue("");

    // Add the relevant controls to the form according to selected page
    switch (this.page = page) {

      // case 'social': break;

      case 'signUp':
        //this.form.controls.password?.setValue("");
        this.form.addControl('username', this.username);
        this.form.addControl('email', this.email);
        this.form.addControl('password', this.password);
        this.submitButton = "Créer un compte";
        break;

      case 'signIn':
        this.form.addControl('username', this.username);
        this.form.addControl('password', this.password);
        this.submitButton = "Connexion";
        // this.button2="Créer un compte";
        break;

      case 'forgotPassword':
        this.form.addControl('username', this.username);
        this.submitButton = "Réinitialiser le mot de passe";
        break;

      // case 'resetPassword':
      // this.form.addControl('newPassword', this.newPassword);
      // break;

      // case 'changePassword':
      // this.form.addControl('password', this.password);
      // this.form.addControl('newPassword', this.newPassword);
      // break;

      // case 'changeEmail':
      // this.form.addControl('password', this.password);
      // this.form.addControl('newEmail', this.newEmail);
      // break;

      // case 'sendEmailVerification':
      // case 'verifyEmail':
      // case 'recoverEmail':
      // break;

      // case 'delete':
      // // Gets the provider the user authenticated with
      // this.auth.getProviderId().then( provider => {

      //   // Asks for the password, eventually
      //   if(provider == 'password') {

      //     this.form.addControl('password', this.password);
      //   }
      // });
      // break;

      default:
        console.error('Invalid login page requested:', page);
    }
  }

}
