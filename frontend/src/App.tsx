import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { LoginPage } from "./pages/login-page/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/chat-page/ChatPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { useSocketConnection } from "./api/socket";
import { useAppSelector } from "./store/store-hooks";

export default function App() {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const isAuthorized = Boolean(currentUser);

  useSocketConnection(isAuthorized);

  return (
    <ScopedCssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chats/" element={<ChatPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ScopedCssBaseline>
  );
}
