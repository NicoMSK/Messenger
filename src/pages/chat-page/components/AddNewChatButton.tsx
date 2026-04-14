import AddIcon from "@mui/icons-material/Add";
import { NewChatButton, NewChatButtonWrapper } from "./AddNewChatButton.styles";

type AddNewChatButtonProps = {
  openAddChat: () => void;
};

export function AddNewChatButton({ openAddChat }: AddNewChatButtonProps) {
  return (
    <NewChatButtonWrapper>
      <NewChatButton color="primary" aria-label="add" onClick={openAddChat}>
        <AddIcon />
      </NewChatButton>
    </NewChatButtonWrapper>
  );
}
