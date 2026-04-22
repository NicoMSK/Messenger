import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { WrapperChatMessage } from "./ChatWindow.style";

export function ChatWindow() {
  const messages = useSelector((state: RootState) => state.message.messages);

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

      <ChatForm />
    </>
  );
}
