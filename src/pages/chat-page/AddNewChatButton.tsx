import { NewChatButton, NewChatButtonWrapper } from "./AddNewChatButtonStyle";
import AddIcon from "@mui/icons-material/Add";

type AddNewChatProps = {
  openAddChat: () => void;
};

export function AddNewChatButton({ openAddChat }: AddNewChatProps) {
  return (
    <NewChatButtonWrapper>
      <NewChatButton color="primary" aria-label="add" onClick={openAddChat}>
        <AddIcon />
      </NewChatButton>
    </NewChatButtonWrapper>
  );
}
