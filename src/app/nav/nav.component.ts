import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public authService: AuthService, private router: Router) { }


  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
