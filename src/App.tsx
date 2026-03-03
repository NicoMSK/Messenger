import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { LoginPage } from "./components/pages/login-page/LoginPage";
import { ChatPage } from "./components/pages/chat-page/chatPage";

export default function App() {
  return (
    <ScopedCssBaseline>
      {/* <LoginPage /> */}
      <ChatPage />
    </ScopedCssBaseline>
  );
}
