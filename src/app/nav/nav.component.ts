import { FbAuthService } from '../services/fb-auth.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public authService: FbAuthService, private router: Router) { }


  logout() {
    this.authService.doLogout().then(
      res => console.log(res)
    );
    this.router.navigate(['/login']);
  }

}
