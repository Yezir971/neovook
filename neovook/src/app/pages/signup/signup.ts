import { Component, inject } from '@angular/core';
import { InputSubmit } from '../../shared/uis/forms/input-submit/input-submit';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../features/services/auth/auth';

@Component({
  selector: 'neo-signup',
  imports: [InputSubmit, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  private readonly authService = inject(Auth)
  private router = inject(Router);

  email: string = "" ;
  password : string = "";
  name : string = "";
  messageError : string = ""
  messageSucces : string = ""

  onSubmit(){
    const body = {
      "email": this.email, 
      "name": this.name,
      "password": this.password
    }
    this.authService.signup(body).subscribe({
      next: (response) => {
        // redirection 
        this.router.navigate(['/connexion']);
        this.messageSucces = "Compte ajouter avec succès !" 
        this.messageError = "";


      },
      error: (err) => {
        this.messageError = "email ou nom existe déjà"
        this.messageSucces = ""; 
      }
    });
    
  }

}
