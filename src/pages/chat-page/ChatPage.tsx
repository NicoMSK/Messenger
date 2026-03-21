import { useNavigate, useParams } from "react-router-dom";
import { useEscClose } from "../../hooks/useEscClose";
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

  const [chats, setChats] = useState([
    { id: "chat-1", title: "Тестовый ЧАТ" },
    { id: "chat-2", title: "Тестовый ЧАТ-2" },
    { id: "chat-3", title: "Тестовый ЧАТ-3" },
    { id: "chat-4", title: "Тестовый ЧАТ-4" },
  ]);

  function addChat(inputValue: string) {
    if (inputValue.trim().length === 0) return;

    setChats((chats) => {
      return [
        ...chats,
        {
          id: String(crypto.randomUUID()),
          title: inputValue,
        },
      ];
    });
  }

  function openAddChat() {
    setIsNewChat(true);
  }

  function renderContent() {
    if (isNewChat)
      return <AddNewChatPage addChat={addChat} clouseForm={closeModal} />;
    if (chatId) return <ChatWindow />;

    return <EmptyChatPage />;
  }

  function closeModal() {
    navigate("/chats");
    setIsNewChat(false);
  }

  useEscClose(closeModal);

  return (
    <ChatSection>
      <Chats openAddChat={openAddChat} chatsData={chats} />
      <ChatsContent>
        {/* {как лучше и правильней сделать?} */}

        {/* {isNewChat ? (
          <AddNewChatPage addChat={addChat} />
        ) : chatId ? (
          <ChatWindow />
        ) : (
          <EmptyChatPage />
        )} */}
        {renderContent()}
      </ChatsContent>
    </ChatSection>
  );
}
