import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  public jwtHelper = new JwtHelperService();
  constructor(private http: Http) {

  }

  public getToken() {
    const token = localStorage.getItem("token");
    if (token) { return token; }
    return null;
  }

  public login(credentials) {
   return this.http.post("/api/authenticate",
      JSON.stringify(credentials))
      .pipe(
        map((response) => {
            const result = response.json();
            if (result && result.token) {
              localStorage.setItem("token", result.token);
              return true;
            }
            return false;
          }),
      );
  }

  public logout() {
    localStorage.removeItem("token");
    return !this.getToken();
  }

  public isLoggedIn() {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getCurrentUser() {
    const token = this.getToken();
    if (!token) { return null; }

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }
}
