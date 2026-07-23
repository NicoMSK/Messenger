import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import { WrapperChatMessage } from "./ChatWindow.style";
import { useAppSelector } from "../../../store/store-hooks";
import type { ChatProps } from "../../../shared/types/chat.types";
import { useEffect } from "react";
import { getChatHistoryFromServer } from "../../../api/socket";

export function ChatWindow({ chatId }: ChatProps) {
  const messages = useAppSelector(
    (state) => state.message.messages[chatId] ?? [],
  );

  useEffect(() => {
    console.log("CHAT WINDOW ID", chatId);
    getChatHistoryFromServer({ chatId });
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
