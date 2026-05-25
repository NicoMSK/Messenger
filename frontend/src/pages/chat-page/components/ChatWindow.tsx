import { useEffect } from "react";
import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import { WrapperChatMessage } from "./ChatWindow.style";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import type { ChatProps } from "../../../shared/types/chat.types";
import { addMessage, setMessages } from "../../../store/slices/messagesSlice";
import {
  socketService,
  mapBackendMessage,
  type WsEvent,
} from "../../../api/socketService";

export function ChatWindow({ chatId }: ChatProps) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(
    (state) => state.message.messages[chatId] ?? [],
  );

  useEffect(() => {
    socketService.connect(chatId);

    const handler = (event: WsEvent) => {
      if (event.type === "history") {
        dispatch(
          setMessages({
            chatId,
            messages: event.messages.map(mapBackendMessage),
          }),
        );
      } else if (event.type === "message:new") {
        dispatch(
          addMessage({
            chatId,
            message: mapBackendMessage(event.message),
          }),
        );
      }
    };

    socketService.addHandler(handler);

    return () => {
      socketService.removeHandler(handler);
      socketService.disconnect();
    };
  }, [chatId, dispatch]);

  return (
    <>
      {messages.length === 0 ? (
        <WrapperChatMessage>Тут нет сообщений</WrapperChatMessage>
      ) : (
        messages.map((mes) => (
          <Messages
            key={mes.id}
            id={mes.id}
            author={mes.author}
            time={mes.time}
            text={mes.text}
          />
        ))
      )}
      <ChatForm key={chatId} chatId={chatId} />
    </>
  );
}
