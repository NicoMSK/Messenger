import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import { WrapperChatMessage } from "./ChatWindow.style";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import type { ChatProps } from "../../../shared/types/chat.types";
import {
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../../../api/socket";
import { addMessage } from "../../../store/slices/messagesSlice";
import { useEffect } from "react";

export function ChatWindow({ chatId }: ChatProps) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(
    (state) => state.message.messages[chatId] ?? [],
  );

  useEffect(() => {
    subscribeToMessages((message) => {
      console.log("MESSAGE FROM SOCKET", message);
      console.log("DISPATCH");
      dispatch(
        addMessage({
          chatId: message.message.chatId,
          message: message.message,
        }),
      );
    });

    return () => {
      unsubscribeFromMessages();
    };
  }, [chatId]);

  return (
    <>
      {messages?.length === 0 ? (
        <WrapperChatMessage>Тут нет сообщений</WrapperChatMessage>
      ) : (
        messages.map((mes) => (
          <Messages
            key={mes.id}
            userName={mes.userName}
            createdAt={mes.createdAt}
            content={mes.content}
          />
        ))
      )}
      <ChatForm key={chatId} chatId={chatId} />
    </>
  );
}
