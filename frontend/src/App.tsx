import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { LoginPage } from "./pages/login-page/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/chat-page/ChatPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { connectSocket } from "./api/socket";
import { useEffect } from "react";
import { useAppSelector } from "./store/store-hooks";
import { getCurrentUserName } from "./store/selectors";

export default function App() {
  const currentUser = useAppSelector(getCurrentUserName);

  useEffect(() => {
    if (currentUser) {
      connectSocket();
    }
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
