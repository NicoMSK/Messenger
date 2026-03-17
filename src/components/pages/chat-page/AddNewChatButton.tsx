import { NewChatButton, NewChatButtonWrapper } from "./AddNewChatButtonStyle";
import AddIcon from "@mui/icons-material/Add";

export type ChatProp = {
  openAddChat: () => void;
};

export function AddNewChat({ openAddChat }: ChatProp) {
  return (
    <NewChatButtonWrapper>
      <NewChatButton color="primary" aria-label="add" onClick={openAddChat}>
        <AddIcon />
      </NewChatButton>
    </NewChatButtonWrapper>
  );
}
