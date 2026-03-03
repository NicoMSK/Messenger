import { ChatForm } from "./ChatForm";
import { ChatsContent, ChatSection } from "./chatPageStyle";
import { Chats } from "./ChatsList";
import { Messages } from "./messages";

export function ChatPage() {
  return (
    <ChatSection>
      <Chats />
      <ChatsContent>
        <Messages />
        <ChatForm />
      </ChatsContent>
    </ChatSection>
  );
}
