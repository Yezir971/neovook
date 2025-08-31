import { Component, input, output } from '@angular/core';
import { oneArticle } from '../../../../models/post';
import { Posts } from '../../../../features/services/post/posts';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'neo-edit-modal',
  imports: [FormsModule],
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css',
})
export class EditModal {
  dataPost = input<oneArticle>();
  showModal: boolean = false;
  constructor(private cookieService: CookieService, private articleService: Posts, private router : Router) {}

  title: string = '';
  body: string = '';

  openModal = () => (this.showModal = true);
  closeModal = () => (this.showModal = false);

  update = () => {
    const auth_token = this.cookieService.get('JWT_user');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });

    let dataUpdate = {
      id_post: this.dataPost()?.id_post,
      title: this.title,
      body: this.body,
      edit_at: new Date(),
    };

    return this.articleService.updateArticle(dataUpdate, headers).subscribe({
      next: () => {
        this.closeModal();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      },
    });
  };
}
