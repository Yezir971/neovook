import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { getallArticle } from '../../../models/post';

@Injectable({
  providedIn: 'root'
})
export class Posts {
  private readonly httpClient = inject(HttpClient)
  private urlApi = environment.apiUrl

  getAllPost(headers : HttpHeaders) : Observable<getallArticle[]> {
    const data = this.httpClient.get<getallArticle[]>(`${this.urlApi}/article/get`,  { headers })
    return data
  }

  
}
