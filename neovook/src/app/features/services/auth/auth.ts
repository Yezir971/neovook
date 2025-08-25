import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loginResponse } from '../../../models/login';
import { environment } from '../../../../environment';
import { bodyLogin } from '../../../models/body';
import { catchError, map, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { authVerifyResponse } from '../../../models/auth';
import { Router } from '@angular/router';
import { bodySignup, signupResponse } from '../../../models/signup';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)
  private readonly router = inject(Router)
  private apiUrl = environment.apiUrl
  
  auth(body : bodyLogin) : Observable<loginResponse>{
    const data = this.httpClient.post<loginResponse>(`${this.apiUrl}/auth/login`, body)
    return data
  }
  signup(body : bodySignup): Observable<signupResponse>{
    const data = this.httpClient.post<signupResponse>(`${this.apiUrl}/user/create`, body)
    return data

  }
  isAuthenticated() : Observable<boolean>{
    const tokenUser = this.cookieService.get('JWT_user' )
    if(!tokenUser){
      return of(false)
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${tokenUser}`
    });
    return this.httpClient.get<authVerifyResponse>(`${this.apiUrl}/auth/verify`, { headers })
      .pipe(
        map(res => {
            return res.success}),
        catchError(err => {
          return of(false);           
        })
      );
  }


}
