import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'neo-input-textarea',
  imports: [FormsModule],
  templateUrl: './input-textarea.html',
  styleUrl: './input-textarea.css',
})
export class InputTextarea {
  readonly commentOutput = output<string>();

  comment: string = '';
  onCommentChange(): void {
    this.commentOutput.emit(this.comment);
  }
  
}
