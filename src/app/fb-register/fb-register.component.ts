import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Params, Router } from "@angular/router";
import { FbAuthService } from "../services/fb-auth.service";

@Component({
  selector: "app-fb-register",
  styleUrls: ["./fb-register.component.css"],
  templateUrl: "./fb-register.component.html",
})

  export class FbRegisterComponent {

    public registerForm: FormGroup;
    public errorMessage = "";
    public successMessage = "";

    constructor(
      public authService: FbAuthService,
      private router: Router,
      private fb: FormBuilder,
    ) {
      this.createForm();
     }

     public createForm() {
       this.registerForm = this.fb.group({
         email: ["", Validators.required ],
         password: ["", Validators.required],
       });
     }

     public tryRegister(value) {
       this.authService.doRegister(value)
       .then((res) => {
         this.errorMessage = "";
         this.successMessage = "Your account has been created";
       }, (err) => {
         this.errorMessage = err.message;
         this.successMessage = "";
       });
     }

  }
