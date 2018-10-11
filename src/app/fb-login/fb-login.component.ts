import { FbAuthService } from '../services/fb-auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    public authService: FbAuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }
/*
  tryFacebookLogin() {
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }
*/
  tryLogin(value) {
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
