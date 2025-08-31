import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { getallArticle } from '../../../models/post';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private readonly httpClient = inject(HttpClient);
  private urlApi = environment.apiUrl;

  getAllPost(headers: HttpHeaders): Observable<getallArticle[]> {
    const data = this.httpClient.get<getallArticle[]>(`${this.urlApi}/article/get`, { headers });
    return data;
  }
  getAllPostUser(headers: HttpHeaders): Observable<getallArticle[]> {
    const data = this.httpClient.get<getallArticle[]>(`${this.urlApi}/article/user/get`, {
      headers,
    });
    return data;
  }
  getProfile(headers: HttpHeaders): Observable<any> {
    return this.httpClient.get<any>(`${this.urlApi}/user/profile`, { headers });
  }
  deleteArticle(body: any, headers: HttpHeaders): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlApi}/article/delete`, { headers, body });
  }

  createPost(
    data: { title: string; body: string; create_at: Date },
    headers: HttpHeaders
  ): Observable<any> {
    return this.httpClient.post<any>(`${this.urlApi}/article/create`, data, { headers });
  }
}
