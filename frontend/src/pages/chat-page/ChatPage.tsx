import { useSearchParams } from "react-router-dom";
import { useEscClose } from "../../shared/hooks/useEscClose";
import { ChatsContent, ChatSection } from "./ChatPage.styles";
import { Chats } from "./components/ChatsList";
import { AddNewChatModal } from "./components/AddNewChatModal";
import { useEffect, useState } from "react";
import { ChatWindow } from "./components/ChatWindow";
import { EmptyChatPage } from "../../shared/components/EmptyChatPage";
import { useAppDispatch } from "../../store/store-hooks";
import { addChat, setChats } from "../../store/slices/chatsSlice";
import { createChat, getChats } from "../../api/chatApi";

export function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const [openAddNewChatModal, setOpenAddNewChatModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getChats();
      dispatch(setChats(chats));
    };
    fetchChats();
  }, []);

  async function addNewChat(inputValue: string) {
    const newChat = await createChat(inputValue);

    if (!newChat) {
      console.error("Failed to create chat");
      return;
    }

    dispatch(addChat(newChat));
    setSearchParams({ chatId: newChat.id });
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
