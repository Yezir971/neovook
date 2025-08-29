import { Component, inject, OnInit } from '@angular/core';
import { Posts } from '../../features/services/post/posts';
import { getallArticle } from '../../models/post';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'neo-post',
  templateUrl: './post.html',
  styleUrl: './post.css',
  standalone: true,
})
export class Post {
  constructor(private cookieService: CookieService){}
  private readonly postService = inject(Posts)
  data: getallArticle[] = [];
  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() : void {
    const auth_token = this.cookieService.get('JWT_user')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    this.postService.getAllPost(headers).subscribe({
      next: (res)=> {
        console.log(res);
        this.data = res
      },
      error: (err) => {
        console.log(err);
        alert('erreur'+ err)
      }
    })
  }

}
