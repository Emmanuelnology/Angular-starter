import { Component } from '@angular/core';
import { FbAuthService } from '../services/fb-auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fb-register',
  templateUrl: './fb-register.component.html',
  styleUrls: ['./fb-register.component.css']
})

  export class FbRegisterComponent {

    registerForm: FormGroup;
    errorMessage = '';
    successMessage = '';

    constructor(
      public authService: FbAuthService,
      private router: Router,
      private fb: FormBuilder
    ) {
      this.createForm();
     }

     createForm() {
       this.registerForm = this.fb.group({
         email: ['', Validators.required ],
         password: ['', Validators.required]
       });
     }

     tryRegister(value) {
       this.authService.doRegister(value)
       .then(res => {
         console.log(res);
         this.errorMessage = '';
         this.successMessage = 'Your account has been created';
       }, err => {
         console.log(err);
         this.errorMessage = err.message;
         this.successMessage = '';
       })
     }

  }

