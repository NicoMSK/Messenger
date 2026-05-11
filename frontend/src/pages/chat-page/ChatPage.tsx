import { useSearchParams } from "react-router-dom";
import { useEscClose } from "../../shared/hooks/useEscClose";
import { ChatsContent, ChatSection } from "./ChatPage.styles";
import { Chats } from "./components/ChatsList";
import { AddNewChatModal } from "./components/AddNewChatModal";
import { useState } from "react";
import { ChatWindow } from "./components/ChatWindow";
import { EmptyChatPage } from "../../shared/components/EmptyChatPage";
import { useAppDispatch } from "../../store/store-hooks";
import { addChat } from "../../store/slices/chatsSlice";

export function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const [openAddNewChatModal, setOpenAddNewChatModal] = useState(false);
  const dispatch = useAppDispatch();

  function addNewChat(inputValue: string) {
    const newChatId = crypto.randomUUID();

    if (inputValue.trim().length === 0) return;

    dispatch(addChat({ id: newChatId, title: inputValue }));
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
        addChat={addNewChat}
        closeForm={closeModal}
      />
      <Chats openAddChat={openAddChat} chatId={chatId} />
      <ChatsContent>
        {chatId ? <ChatWindow chatId={chatId} /> : <EmptyChatPage />}
      </ChatsContent>
    </ChatSection>
  );
}
