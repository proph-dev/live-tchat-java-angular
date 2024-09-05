import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-list',
  standalone: true,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  imports: [CommonModule],
})
export class MessageListComponent {
  @Input() messages: Message[] = [];
  @Input() currentUser!: string;

  isSelf(message: Message) {
    return message.sender === this.currentUser;
  }
}
