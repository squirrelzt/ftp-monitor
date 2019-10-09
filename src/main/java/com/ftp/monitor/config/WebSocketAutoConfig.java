package com.ftp.monitor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.*;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
@EnableWebSocket
public class WebSocketAutoConfig implements WebSocketConfigurer {

    /**
     *  存储sessionId和webSocketSession
     *  需要注意的是，webSocketSession没有提供无参构造，不能进行序列化，也就不能通过redis存储
     *  在分布式系统中，要想别的办法实现webSocketSession共享
     */
    public static Map<String, WebSocketSession> sessionMap = new ConcurrentHashMap<>();
    public static Map<String, String> businessKeyMap = new ConcurrentHashMap<>();

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(new WebSocketHandler() {
            @Override
            public void afterConnectionEstablished(WebSocketSession webSocketSession) throws Exception {
                String id = webSocketSession.getId();
//                System.out.println(id);
//                System.out.println(webSocketSession);
                String businessKey = String.valueOf(webSocketSession.getAttributes().get("businessKey"));
                businessKeyMap.put(businessKey, webSocketSession.getId());
                sessionMap.put(webSocketSession.getId(), webSocketSession);
                webSocketSession.sendMessage(new TextMessage("111111111"));
            }

            @Override
            public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> webSocketMessage) throws Exception {

            }

            @Override
            public void handleTransportError(WebSocketSession webSocketSession, Throwable throwable) throws Exception {

            }

            @Override
            public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus closeStatus) throws Exception {

            }

            @Override
            public boolean supportsPartialMessages() {
                return false;
            }
        }, "/websocket")
                .addInterceptors(null)
                // 允许跨域
                .setAllowedOrigins("*");
    }

    public void sendMessage(String user, String message){
        String sessionId = businessKeyMap.get(user);
        WebSocketSession session = sessionMap.get(sessionId);
        try {
            session.sendMessage(new TextMessage(message));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
