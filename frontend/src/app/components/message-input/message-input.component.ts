import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-input',
  standalone: true,
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class MessageInputComponent {
  @Output() messageSent = new EventEmitter<Message>();
  messageContent: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    const trimmedContent = this.messageContent.trim();
  
    if (trimmedContent) {
      const sender = localStorage.getItem('name') || 'Anonyme';
      const newMessage: Message = {
        sender: sender,
        content: trimmedContent,
        isLocal: true
      };
  
      this.chatService.sendMessage(newMessage);
      this.messageContent = '';
    }
  }
}
