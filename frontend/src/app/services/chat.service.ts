import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import SockJS from 'sockjs-client';
import { Client, Message as StompMessage, over } from 'stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient!: Client;

  private messageSubject = new Subject<Message>();

  constructor() {
    this.connect();
  }

  private connect(): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/public', (message: StompMessage) => {
        const chatMessage: Message = JSON.parse(message.body);
        this.messageSubject.next(chatMessage);
      });
    });
  }

  getMessages(): Subject<Message> {
    return this.messageSubject;
  }

  sendMessage(message: Message): void {
    const { isLocal, ...messageToSend } = message;
    this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
  }
}
