import { NewChatButton, NewChatButtonWrapper } from "./AddNewChatStyle";
import AddIcon from "@mui/icons-material/Add";

type ChatProp = { addChat: () => void };

export function AddNewChat({ addChat }: ChatProp) {
  return (
    <NewChatButtonWrapper>
      <NewChatButton color="primary" aria-label="add" onClick={addChat}>
        <AddIcon />
      </NewChatButton>
    </NewChatButtonWrapper>
  );
}
