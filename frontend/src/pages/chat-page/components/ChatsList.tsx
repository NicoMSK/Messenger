import { AddNewChatButton } from "./AddNewChatButton";
import {
  ChatsCurrentUser,
  ChatsCurrentUserName,
  ChatsItem,
  ChatsLink,
  ChatsList,
  ChatsTitle,
  ChatsWrapper,
} from "./ChatsList.styles";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { logout } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ExitButton } from "../../../shared/components/ExitButton";

export type ChatProp = {
  openAddChat: () => void;
  chatId: string | null;
};

export function Chats({ openAddChat, chatId }: ChatProp) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const chatsData = useAppSelector((state) => state.chat.chats);
  const currentUser = useAppSelector(
    (state) => state.auth.currentUser?.name || "Гость",
  );

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <ChatsWrapper>
      <ChatsTitle>Список чатов</ChatsTitle>
      <ChatsCurrentUser>
        Вы вошли как: <ChatsCurrentUserName>{currentUser}</ChatsCurrentUserName>
      </ChatsCurrentUser>
      <ChatsList>
        {chatsData.map((chat) => (
          <ChatsItem key={chat.id}>
            <ChatsLink
              isActive={chatId === chat.id}
              to={`/chats?chatId=${chat.id}`}
            >
              {chat.title}
            </ChatsLink>
          </ChatsItem>
        ))}
      </ChatsList>
      <AddNewChatButton openAddChat={openAddChat} />
      <ExitButton clickHandler={handleLogout} />
    </ChatsWrapper>
  );
}
