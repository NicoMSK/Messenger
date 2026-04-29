import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { LoginPage } from "./pages/login-page/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/chat-page/ChatPage";

export default function App() {
  return (
    <ScopedCssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chats/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </ScopedCssBaseline>
  );
}
