import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../../features/services/auth/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'neo-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private cookieService: CookieService) { }
  private router = inject(Router);
  private authService = inject(Auth)
  isAuthentificated$ : Observable<boolean> = this.authService.isAuthenticated()

  logOut(){
    // on supprime le JWT dans les cookies 
    this.cookieService.delete('JWT_user')
    // redirection 
    this.router.navigate(['/']);
  }

}
