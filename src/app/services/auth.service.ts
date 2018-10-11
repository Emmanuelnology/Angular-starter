import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  constructor(private http: Http) {

  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
      return null
  }

  login(credentials) {
   return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .pipe(
        map(response => {
            const result = response.json();
            if (result && result.token) {
              localStorage.setItem('token', result.token);
              return true;
            }
            return false;
          })
      );
  }

  logout() {
    localStorage.removeItem('token');
    return !this.getToken();
  }

  isLoggedIn() {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUser() {
    const token = this.getToken();
    if (!token) {return null};
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }
}

