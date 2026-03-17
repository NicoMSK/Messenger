import { useNavigate, useParams } from "react-router-dom";
import { useEscClose } from "../../../hooks/useEscClose";
import { ChatsContent, ChatSection } from "./chatPageStyle";
import { Chats } from "./ChatsList";
import { EmptyChatPage } from "./EmptyChatPage";
import { AddNewChatPage } from "./AddNewChatPage";
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";

export function ChatPage() {
  const { chatId } = useParams();
  const [isNewChat, setIsNewChat] = useState(false);
  const navigate = useNavigate();

  function openAddChat() {
    setIsNewChat(true);
  }

  function closeModal() {
    navigate("/chats");
    setIsNewChat(false);
  }

  useEscClose(closeModal);

  return (
    <ChatSection>
      <Chats openAddChat={openAddChat} />
      <ChatsContent
        onClick={(e) => e.currentTarget === e.target && closeModal()}
      >
        {isNewChat ? (
          <AddNewChatPage />
        ) : chatId ? (
          <ChatWindow />
        ) : (
          <EmptyChatPage />
        )}
      </ChatsContent>
    </ChatSection>
  );
}
