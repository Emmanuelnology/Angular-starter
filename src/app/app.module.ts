import { ReactiveFormsModule } from "@angular/forms";
import { environment } from "../environments/environment";

// Auth

import { AdminAuthGuard } from "./services/admin-auth-guard.service";
import { AuthGuard } from "./services/auth-guard.service";

// Services
import { FbAuthService } from "./services/fb-auth.service";
import { TaskService } from "./services/task.service";
import { UserService } from "./services/user.service";

// HTTP
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { GravatarModule } from "ngx-gravatar";

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { BaseRequestOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { fakeBackendProvider } from "./helpers/fake-backend";

import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AccountComponent } from "./account/account.component";
import { AdminComponent } from "./admin/admin.component";
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./error/error.component";
import { FbLoginComponent } from "./fb-login/fb-login.component";
import { FbRegisterComponent } from "./fb-register/fb-register.component";
import { HomeComponent } from "./home/home.component";
import { NavComponent } from "./nav/nav.component";
import { NoAccessComponent } from "./no-access/no-access.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { SquareImageComponent } from "./square-image/square-image.component";
import { TodolistComponent } from "./todolist/todolist.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    NotFoundComponent,
    NoAccessComponent,
    NavComponent,
    SpinnerComponent,
    TodolistComponent,
    ErrorComponent,
    AccountComponent,
    SquareImageComponent,
    FbLoginComponent,
    FbRegisterComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    GravatarModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, canActivate: [AuthGuard] },
      { path: "login", component: FbLoginComponent },
      { path: "register", component: FbRegisterComponent },

      { path: "tasks", component: TodolistComponent, canActivate: [AuthGuard] },
      { path: "account", component: AccountComponent, canActivate: [AuthGuard] },

      { path: "admin", component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] },

      { path: "no-access", component: NoAccessComponent },
      { path: "**", component: NotFoundComponent },
    ]),
  ],
  providers: [
    UserService,
    TaskService,
    FbAuthService,
  ],
})
export class AppModule { }
