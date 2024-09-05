import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from '../../components/message-list/message-list.component';
import { MessageInputComponent } from '../../components/message-input/message-input.component';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [FormsModule, CommonModule, MessageListComponent, MessageInputComponent],
})
export class ChatComponent implements OnInit {
  showNameModal: boolean = false;
  username: string = '';
  messages: Message[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      this.username = savedName;
      this.showNameModal = false;
      this.subscribeToMessages();
    } else {
      this.showNameModal = true;
    }
  }

  saveName(): void {
    if (this.username.trim()) {
      localStorage.setItem('name', this.username.trim());
      this.showNameModal = false;
      this.subscribeToMessages();
    } else {
      alert('Veuillez entrer un nom.');
    }
  }

  subscribeToMessages(): void {
    this.chatService.getMessages().subscribe((message: Message) => {
      if (!message.isLocal) {
        this.messages.push(message);
      }
    });
  }

  onMessageSent(message: Message): void {
    this.messages.push(message);
  }
}
