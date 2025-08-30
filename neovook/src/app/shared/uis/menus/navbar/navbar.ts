import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../../features/services/auth/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'neo-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(Auth);
  private readonly router = inject(Router);

  isLoggedIn$ = this.authService.isLoggedIn$;

  logOut() {
    this.authService.logOut();
    // redirection
    this.router.navigate(['/']);
  }
}
