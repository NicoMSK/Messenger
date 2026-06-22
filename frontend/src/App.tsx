import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { LoginPage } from "./pages/login-page/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/chat-page/ChatPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";

export default function App() {
  return (
    <ScopedCssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/chats/" element={
            <ProtectedRoute element={<ChatPage />} 
            />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chats/" element={<ChatPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ScopedCssBaseline>
  );
}
