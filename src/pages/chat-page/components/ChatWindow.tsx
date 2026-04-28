import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import { WrapperChatMessage } from "./ChatWindow.style";
import { useAppSelector } from "../../../store/store-hooks";
import type { ChatProps } from "../../../shared/types/chat.types";

export function ChatWindow({ chatId }: ChatProps) {
  const messages = useAppSelector(
    (state) => state.message.messages[chatId] ?? [],
  );

  return (
    <>
      {messages?.length === 0 ? (
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
      <ChatForm chatId={chatId} />
    </>
  );
}
