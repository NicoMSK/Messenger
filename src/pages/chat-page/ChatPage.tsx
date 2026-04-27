import { useSearchParams } from "react-router-dom";
import { useEscClose } from "../../shared/hooks/useEscClose";
import { ChatsContent, ChatSection } from "./ChatPage.styles";
import { Chats } from "./components/ChatsList";
import { AddNewChatModal } from "./components/AddNewChatModal";
import { useState } from "react";
import { ChatWindow } from "./components/ChatWindow";
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

    setSearchParams({ chatId: newChatId });
    setOpenAddNewChatModal(false);
  }

  function openAddChat() {
    setOpenAddNewChatModal(true);
  }

  function closeModal() {
    setOpenAddNewChatModal(false);
  }

  function closeChat() {
    setSearchParams({});
  }

  useEscClose(closeModal, openAddNewChatModal);
  useEscClose(closeChat, Boolean(chatId));

  return (
    <ChatSection>
      <AddNewChatModal
        openDialog={openAddNewChatModal}
        addChat={addChat}
        closeForm={closeModal}
      />
      <Chats openAddChat={openAddChat} chatsData={chats} chatId={chatId} />
      <ChatsContent>
        {chatId ? <ChatWindow chatId={chatId} /> : <EmptyChatPage />}
      </ChatsContent>
    </ChatSection>
  );
}
