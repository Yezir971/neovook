import { Component, inject } from '@angular/core';
import { InputSubmit } from "../../shared/uis/forms/input-submit/input-submit";
import { Auth } from '../../features/services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'neo-login',
  imports: [ InputSubmit, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  cookieValue: string = '';
  constructor(private cookieService: CookieService) { }
  private readonly authService = inject(Auth)
  private router = inject(Router);

  email: string = "" ;
  password : string = "";
  messageError : string = ""

  onSubmit(){
    const body = {
      "email": this.email, 
      "password": this.password
    }
    this.authService.auth(body).subscribe({
      next: (response) => {
        // on sauvegarde le JWT dans les cookies 
        this.cookieService.set('JWT_user', response.access_token )
        // redirection 
        this.router.navigate(['/']);

      },
      error: (err) => {
        this.messageError = "Mot de passe ou mail incorrecte"
      }
    });

  }

}
