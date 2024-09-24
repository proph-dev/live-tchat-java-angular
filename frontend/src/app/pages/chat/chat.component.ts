import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { MessageListComponent } from '../../components/message-list/message-list.component';
import { MessageInputComponent } from '../../components/message-input/message-input.component';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [FormsModule, CommonModule, MessageListComponent, MessageInputComponent]
})
export class ChatComponent implements OnInit {
  showLoginModal: boolean = false;
  email: string = '';
  password: string = '';
  username: string = '';
  messages: Message[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private chatService: ChatService) {}

  ngOnInit(): void {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.username = savedUsername;
      this.showLoginModal = false;
      this.subscribeToMessages();
    } else {
      this.showLoginModal = true;
    }
  }

  login(): void {
    this.authService.authenticate(this.email, this.password).subscribe((user) => {
      if (user) {
        this.username = user.username;
        localStorage.setItem('username', user.username);
        this.showLoginModal = false;
        this.errorMessage = '';
        this.subscribeToMessages();
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    });
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
