import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { LoginPage } from "./pages/login-page/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/chat-page/chatPage";

export default function App() {
  return (
    <ScopedCssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/chats/:chatId" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </ScopedCssBaseline>
  );
}
