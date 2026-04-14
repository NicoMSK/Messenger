import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";

export function ChatWindow() {
  return (
    <>
      <Messages
        author={"НИК нейм"}
        time={"12:45 03.03.2026"}
        text={"Сообщение"}
      />
      <ChatForm />
    </>
  );
}
