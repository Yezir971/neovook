import { Component, inject } from '@angular/core';
import { Card } from '../../shared/uis/card/card/card';
import { InputSubmit } from '../../shared/uis/forms/input-submit/input-submit';
import { FormsModule } from '@angular/forms';
import { Posts } from '../../features/services/post/posts';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { ListPost } from '../../features/post/components/list-post/list-post';

@Component({
  selector: 'neo-profil',
  imports: [InputSubmit, FormsModule, ListPost],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil {
  constructor(private cookieService: CookieService) {}
  private readonly postService = inject(Posts);
  body: string = '';
  title: string = '';
  postData: any[] = [];
  messageError: string = '';
  profileData: any = {};
  idpostUpdateOrRemove: string = '';

  ngOnInit() {
    this.getProfile();
    this.getPosts();
  }
  refresh(id: string) {
    this.postData = this.postData.filter((post) => post.id_post !== id);
  }

  getProfile() {
    const auth_token = this.cookieService.get('JWT_user');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    return this.postService.getProfile(headers).subscribe({
      next: (res) => {
        this.profileData = res;
      },
      error: (err) => {
        console.log(err);
        this.messageError = 'Erreur lors de la récupération du profil' + err;
      },
    });
  }

  getPosts() {
    const auth_token = this.cookieService.get('JWT_user');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    return this.postService.getAllPostUser(headers).subscribe({
      next: (res) => {
        this.postData = res;
      },
      error: (err) => {
        this.messageError = 'Erreur lors de la récupération des posts' + err;
      },
    });
  }

  onSubmit() {
    const auth_token = this.cookieService.get('JWT_user');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    let post = { title: this.title, body: this.body, create_at: new Date() };
    return this.postService.createPost(post, headers).subscribe({
      next: (res) => {
        this.getPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
