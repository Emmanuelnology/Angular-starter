import { AdminAuthGuard } from "./services/admin-auth-guard.service";
import { AuthGuard } from "./services/auth-guard.service";
import { OrderService } from "./services/order.service";
import { TaskService } from "./services/task.service";
import { UserService } from "./services/user.service";

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BaseRequestOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { fakeBackendProvider } from "./helpers/fake-backend";
import { AuthService } from "./services/auth.service";

import { AdminComponent } from "./admin/admin.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NoAccessComponent } from "./no-access/no-access.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SignupComponent } from "./signup/signup.component";

import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NavComponent } from "./nav/nav.component";
import { TokenInterceptor } from "./services/token.interceptor";

import { AccountComponent } from "./account/account.component";
import { ErrorComponent } from "./error/error.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { SquareImageComponent } from "./square-image/square-image.component";
import { TodolistComponent } from "./todolist/todolist.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
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
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, canActivate: [AuthGuard] },
      { path: "admin", component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: "login", component: LoginComponent },
      { path: "tasks", component: TodolistComponent },
      { path: "account", component: AccountComponent },
      { path: "no-access", component: NoAccessComponent },
      { path: "**", component: NotFoundComponent },
    ]),
  ],
  providers: [
    OrderService,
    UserService,
    TaskService,
    AuthService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
    },

    // For creating a mock back-end. You don't need these in a real app.
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
  ],
})
export class AppModule { }
