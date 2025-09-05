import { Component, inject, input, output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Posts } from '../../../services/post/posts';
import { HttpHeaders } from '@angular/common/http';
import { EditModal } from "../../../../shared/uis/modal/edit-modal/edit-modal";

@Component({
  selector: 'neo-list-post',
  templateUrl: './list-post.html',
  styleUrl: './list-post.css',
  imports: [EditModal],
})
export class ListPost {
  constructor(private cookieService: CookieService) {
    this.getAllLike()
  }
  private readonly postService = inject(Posts);
  readonly postData = input<any>();
  readonly profileData = input<any>();
  readonly idpostUpdateOrRemove = output<string>();
  
  isLiked = false
  
  getAllLike(){
    console.log( this.postData);
    
    
  }
  
  like(id: string){
    const auth_token = this.cookieService.get('JWT_user');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    const data = {
      id_post: id
    }
    this.isLiked = true
    this.postService.likeArticle(data, headers).subscribe({
      next: (res) => {
        console.log(res.message);
      }, 
      error:  (err) => {
        console.log("une erreur s'est produite au moment d'ajouter le like de l'article : " + err.message);
      }
    })
    
  }
  
  unlike(id: string){
    
    const auth_token = this.cookieService.get('JWT_user');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    const data = {
      id_post: id
    }
    this.isLiked = false
    this.postService.unLikeArticle(data, headers).subscribe({
      next: (res) => {
        console.log(res.message);
        
      },
      error : (err)=> {
        console.log("Errur au moment de retirer le like de l'article !" + err.message);
        
      }
    })

  }

  removeArticle(id: string) {
    const auth_token = this.cookieService.get('JWT_user');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    const body = { id_post: id };
    this.postService.deleteArticle(body, headers).subscribe({
      next: (res) => {
        console.log('article supprimer avec succcès');
        this.idpostUpdateOrRemove.emit(id);
      },
      error: (err) => {
        alert("Erreur lors de la suppression de l'article : " + err.message);
      },
    });
  }
}
