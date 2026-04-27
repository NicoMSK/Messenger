import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import { WrapperChatMessage } from "./ChatWindow.style";
import { useAppSelector } from "../../../store/store-hooks";

type ChatWindowProp = { chatId: string };

export function ChatWindow({ chatId }: ChatWindowProp) {
  const messages = useAppSelector((state) => state.chat.messages[chatId] ?? []);

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
