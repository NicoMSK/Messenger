import { useNavigate, useParams } from "react-router-dom";
import { useEscClose } from "../../../hooks/useEscClose";
import { ChatForm } from "./ChatForm";
import { ChatsContent, ChatSection } from "./chatPageStyle";
import { Chats } from "./ChatsList";
import { EmptyChatPage } from "./EmptyChatPage";
import { Messages } from "./Messages";

export function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  function closeModal() {
    navigate("/chats");
  }

  useEscClose(closeModal);

  return (
    <ChatSection>
      <Chats />
      <ChatsContent
        onClick={(e) => e.currentTarget === e.target && closeModal()}
      >
        {chatId ? (
          <>
            <Messages
              author={"НИК нейм"}
              time={"12:45 03.03.2026"}
              text={"Сообщение"}
            />
            <ChatForm />
          </>
        ) : (
          <EmptyChatPage />
        )}
      </ChatsContent>
    </ChatSection>
  );
}
