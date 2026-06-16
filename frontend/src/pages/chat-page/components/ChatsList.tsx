import { AddNewChatButton } from "./AddNewChatButton";
import {
  ChatsCurrentUser,
  ChatsCurrentUserName,
  ChatsItem,
  ChatsLink,
  ChatsList,
  ChatsTitle,
  ChatsWrapper,
  DeleteChatButton,
} from "./ChatsList.styles";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import { logoutUserThunk } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ExitButton } from "../../../shared/components/ExitButton";
import DeleteIcon from "@mui/icons-material/Delete";

export type ChatProp = {
  openAddChat: () => void;
  removeChat: (idChat: string) => void;
  chatId: string | null;
};

export function Chats({ openAddChat, removeChat, chatId }: ChatProp) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const chatsData = useAppSelector((state) => state.chat.chats);
  const currentUser = useAppSelector(
    (state) => state.auth.currentUser?.name || "Гость",
  );

  async function handleLogout() {
    const isLoggedOut = await dispatch(logoutUserThunk());

    if (isLoggedOut) {
      navigate("/login");
    }
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
              {chat.name}
            </ChatsLink>
            <DeleteChatButton
              onClick={() => removeChat(chat.id)}
              aria-label="delete"
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </DeleteChatButton>
          </ChatsItem>
        ))}
      </ChatsList>
      <AddNewChatButton openAddChat={openAddChat} />
      <ExitButton clickHandler={handleLogout} />
    </ChatsWrapper>
  );
}
