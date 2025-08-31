import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { articleUpdateBodyDto, getallArticle } from '../../../models/post';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private readonly httpClient = inject(HttpClient);
  private urlApi = environment.apiUrl;

  private postsSubject = new BehaviorSubject<getallArticle[]>([]); 
  posts$ = this.postsSubject.asObservable();

  private wordPostSubject = new BehaviorSubject<getallArticle[]>([]);
  wordPost$ = this.wordPostSubject.asObservable();

  getAllpost(headers: HttpHeaders) {
    this.httpClient.get<getallArticle[]>(`${this.urlApi}/article/get`, { headers }).subscribe((posts) =>{
      this.wordPostSubject.next(posts);
    })
  }

  getAllPostUser(headers: HttpHeaders) {
    this.httpClient
      .get<getallArticle[]>(`${this.urlApi}/article/user/get`, { headers })
      .subscribe((posts) => {
        this.postsSubject.next(posts);
      });
  }

  getProfile(headers: HttpHeaders): Observable<any> {
    return this.httpClient.get<any>(`${this.urlApi}/user/profile`, { headers });
  }
  deleteArticle(body: any, headers: HttpHeaders): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlApi}/article/delete`, { headers, body }).pipe(
      tap(() => {
        const currentPosts = this.postsSubject.value;
        const updatedPosts = currentPosts.filter(post => post.id_post !== body.id_post);
        this.postsSubject.next(updatedPosts);

        const pagePosts = this.wordPostSubject.value;
        const updatedPagePosts = pagePosts.filter(post => post.id_post !== body.id_post);
        this.wordPostSubject.next(updatedPagePosts);

      })
    );
  }

  createPost(
    data: { title: string; body: string; create_at: Date },
    headers: HttpHeaders
  ): Observable<any> {
    return this.httpClient.post<any>(`${this.urlApi}/article/create`, data, { headers }).pipe(
      tap((newPost) => {
        console.log(newPost);
        
        const currentPosts = this.postsSubject.value;
        this.postsSubject.next([...currentPosts, newPost.data]); 
      })
    );
  }

  updateArticle(data: articleUpdateBodyDto, headers: HttpHeaders): Observable<any> {
    return this.httpClient.patch<any>(`${this.urlApi}/article/update`, data, { headers }).pipe(
      tap((updatedPost) => {
        
        const currentPosts = this.postsSubject.value;
        const updatedPosts = currentPosts.map(post =>
          post.id_post === updatedPost.data.id_post ? updatedPost.data : post
        );
        this.postsSubject.next(updatedPosts);


        const currentPagePosts = this.wordPostSubject.value;
        const updatedPagePosts = currentPagePosts.map(post =>
          post.id_post === updatedPost.data.id_post ? updatedPost.data : post
        );
        this.wordPostSubject.next(updatedPagePosts);


      })
    );
  }
}
