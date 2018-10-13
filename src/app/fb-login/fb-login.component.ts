import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FbAuthService } from "../services/fb-auth.service";

@Component({
  selector: "app-fb-login",
  styleUrls: ["./fb-login.component.css"],
  templateUrl: "./fb-login.component.html",
})
export class FbLoginComponent {

  public loginForm: FormGroup;
  public errorMessage = "";

  constructor(
    public authService: FbAuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  public createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required ],
      password: ["", Validators.required],
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
  public tryLogin(value) {
    this.authService.doLogin(value)
    .then((res) => {
      this.router.navigate(["/"]);
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

}
