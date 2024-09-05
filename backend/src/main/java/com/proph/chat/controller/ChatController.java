package com.proph.chat.controller;

import com.proph.chat.model.ChatMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        log.info("Received message: {}", chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.sendToUser")
    public void sendToUser(ChatMessage chatMessage) {
        log.info("Sending private message to user: {}, messageContent: {}", chatMessage.getSender(), chatMessage.getContent());
        messagingTemplate.convertAndSendToUser(
                chatMessage.getSender(), 
                "/queue/private", 
                chatMessage
        );
    }
}
