import { useSearchParams } from "react-router-dom";
import { useEscClose } from "../../shared/hooks/useEscClose";
import { ChatsContent, ChatSection } from "./chatPageStyle";
import { Chats } from "./ChatsList";
import { AddNewChat } from "./AddNewChat";
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { EmptyChatPage } from "../../shared/components/EmptyChatPage";

const MOCK_INITIAL_CHATS = [
  { id: "chat-1", title: "Тестовый ЧАТ" },
  { id: "chat-2", title: "Тестовый ЧАТ-2" },
  { id: "chat-3", title: "Тестовый ЧАТ-3" },
  { id: "chat-4", title: "Тестовый ЧАТ-4" },
];

export function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const [isAddChatFormOpen, setIsAddChatFormOpen] = useState(false);
  const [openAddNewChatModal, setOpenAddNewChatModal] = useState(false);

  const [chats, setChats] = useState(MOCK_INITIAL_CHATS);

  function addChat(inputValue: string) {
    const newChatId = crypto.randomUUID();

    if (inputValue.trim().length === 0) return;

    setChats((chats) => {
      return [
        ...chats,
        {
          id: newChatId,
          title: inputValue,
        },
      ];
    });

    setIsAddChatFormOpen(false);
    setSearchParams({ chatId: newChatId });
  }

  function openAddChat() {
    setSearchParams({});
    setOpenAddNewChatModal(true);
    setIsAddChatFormOpen(true);
  }

  function renderContent() {
    if (isAddChatFormOpen && !chatId) {
      return (
        <AddNewChat
          openDialog={openAddNewChatModal}
          addChat={addChat}
          clouseForm={closeModal}
        />
      );
    }
    if (chatId) {
      return <ChatWindow />;
    }

    return <EmptyChatPage />;
  }

  function closeModal() {
    setSearchParams({});
    setOpenAddNewChatModal(false);
    setIsAddChatFormOpen(false);
  }

  useEscClose(closeModal);

  return (
    <ChatSection>
      <Chats openAddChat={openAddChat} chatsData={chats} chatId={chatId} />
      <ChatsContent>{renderContent()}</ChatsContent>
    </ChatSection>
  );
}
