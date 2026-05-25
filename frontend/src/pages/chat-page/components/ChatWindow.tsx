import { useEffect } from "react";
import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import { WrapperChatMessage } from "./ChatWindow.style";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import type { ChatProps } from "../../../shared/types/chat.types";
import { clearUnread } from "../../../store/slices/messagesSlice";
import { socketService } from "../../../api/socketService";

export function ChatWindow({ chatId }: ChatProps) {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(
    (state) => state.message.messages[chatId] ?? [],
  );

  useEffect(() => {
    const cancel = socketService.openChatWhenReady(chatId);
    dispatch(clearUnread(chatId));
    return cancel;
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
