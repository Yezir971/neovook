import { Component, inject, OnInit } from '@angular/core';
import { Posts } from '../../features/services/post/posts';
import { getallArticle } from '../../models/post';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ListPost } from "../../features/post/components/list-post/list-post";

@Component({
  selector: 'neo-post',
  templateUrl: './post.html',
  styleUrl: './post.css',
  standalone: true,
  imports: [ ListPost],
})
export class Post {
  constructor(private cookieService: CookieService) {}
  private readonly postService = inject(Posts);
  data: getallArticle[] = [];
  messageError: string = '';
  profileData: any = {};
  ngOnInit(): void {
    this.getAllData();
    this.getProfile();

  }
  refresh(id: string) {
    this.data = this.data.filter((post) => post.id_post !== id);
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

  getAllData(): void {
    const auth_token = this.cookieService.get('JWT_user');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    this.postService.getAllPost(headers).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
      },
      error: (err) => {
        console.log(err);
        alert('erreur' + err);
      },
    });
  }
}
