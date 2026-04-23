import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { WrapperChatMessage } from "./ChatWindow.style";

type ChatWindowProp = { chatId: string };

export function ChatWindow({ chatId }: ChatWindowProp) {
  const messages = useSelector(
    (state: RootState) => state.chat.messages[chatId] ?? [],
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
