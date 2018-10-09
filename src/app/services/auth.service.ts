import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper=new JwtHelperService();
  constructor(private http: Http) {

  }

  getToken() {
    let token=localStorage.getItem('token');
    if(token) return token;
      return null
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials))
      .pipe(
        map(response => {
            let result=response.json();
            if(result && result.token){
              localStorage.setItem('token',result.token);
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
    let token=this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUser() {
    let token=this.getToken();
    if (!token) return null;
    
    let decodedToken=this.jwtHelper.decodeToken(token);
    return decodedToken;
  }
}

