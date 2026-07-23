import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { LoginPage } from "./pages/login-page/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/chat-page/ChatPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import {
  connectSocket,
  disconnectSocket,
  subscribeToChatCreated,
  subscribeToChatHistory,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "./api/socket";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store-hooks";
import { getCurrentUserName } from "./store/selectors";
import { addMessage, setChatHistory } from "./store/slices/messagesSlice";
import { addChat } from "./store/slices/chatsSlice";

export default function App() {
  const currentUser = useAppSelector(getCurrentUserName);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      connectSocket();

      subscribeToMessages((message) => {
        dispatch(
          addMessage({
            chatId: message.message.chatId,
            message: message.message,
          }),
        );
      });

      subscribeToChatCreated((chat) => {
        dispatch(addChat(chat.chat));
      });

      subscribeToChatHistory((history) => {
        dispatch(setChatHistory(history));
      });
    }

    return () => {
      unsubscribeFromMessages();
      disconnectSocket();
    };
  }, [currentUser]);

  return (
    <ScopedCssBaseline>
      <BrowserRouter>
        <Routes>
          <Route
            path="/chats/"
            element={<ProtectedRoute element={<ChatPage />} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/chats" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ScopedCssBaseline>
  );
}
