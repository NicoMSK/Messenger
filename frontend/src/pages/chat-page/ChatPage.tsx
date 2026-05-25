import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEscClose } from "../../shared/hooks/useEscClose";
import { ChatsContent, ChatSection } from "./ChatPage.styles";
import { Chats } from "./components/ChatsList";
import { AddNewChatModal } from "./components/AddNewChatModal";
import { ChatWindow } from "./components/ChatWindow";
import { EmptyChatPage } from "../../shared/components/EmptyChatPage";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { addChat, deleteChat, setChats } from "../../store/slices/chatsSlice";
import {
  addMessage,
  incrementUnread,
  setMessages,
} from "../../store/slices/messagesSlice";
import { createChat, deleteChatApi, getChats } from "../../api/chatApi";
import {
  socketService,
  mapBackendMessage,
  type WsEvent,
} from "../../api/socketService";

export function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const [openAddNewChatModal, setOpenAddNewChatModal] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  // Keep latest chatId accessible inside the stable handler without re-subscribing
  const activeChatIdRef = useRef<string | null>(chatId);
  useEffect(() => {
    activeChatIdRef.current = chatId;
  }, [chatId]);

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getChats();
      dispatch(setChats(chats));
    };
    fetchChats();
  }, []);

  const globalHandler = useCallback(
    (event: WsEvent) => {
      if (event.type === "history") {
        dispatch(
          setMessages({
            chatId: event.chatId,
            messages: event.messages.map(mapBackendMessage),
          }),
        );
      } else if (event.type === "message:new") {
        dispatch(
          addMessage({
            chatId: event.chatId,
            message: mapBackendMessage(event.message),
          }),
        );
        if (event.chatId !== activeChatIdRef.current) {
          dispatch(incrementUnread(event.chatId));
        }
      } else if (event.type === "chat:created") {
        dispatch(addChat({ id: event.chat.id, name: event.chat.name }));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!currentUser) return;
    socketService.connect(currentUser.name);
    socketService.addHandler(globalHandler);
    return () => {
      socketService.removeHandler(globalHandler);
      socketService.disconnect();
    };
  }, [currentUser, globalHandler]);

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

  async function removeChat(idChat: string) {
    const result = await deleteChatApi(idChat);
    if (!result) {
      console.error("Failed to delete chat");
      return;
    }
    dispatch(deleteChat(idChat));
    if (chatId === idChat) {
      setSearchParams({});
    }
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
      <Chats
        openAddChat={openAddChat}
        removeChat={removeChat}
        chatId={chatId}
      />
      <ChatsContent>
        {chatId ? <ChatWindow chatId={chatId} /> : <EmptyChatPage />}
      </ChatsContent>
    </ChatSection>
  );
}
