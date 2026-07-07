import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import {
  ChatsFormMessage,
  ChatsMessegeButton,
  ChatsWrapperForm,
} from "./Messages.styles";
import { useState } from "react";
import { useAppSelector } from "../../../store/store-hooks";
import type { ChatProps } from "../../../shared/types/chat.types";
import { sendMessageToServer } from "../../../api/socket";
import { getCurrentUserName } from "../../../store/selectors";

export function ChatForm({ chatId }: ChatProps) {
  const [inputText, setInputText] = useState("");
  const currentUser = useAppSelector(getCurrentUserName);

  const handleSend = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputText.trim() === "") return;
    if (!currentUser) {
      return null;
    }
    sendMessageToServer(chatId, currentUser, inputText);

    setInputText("");
  };

  return (
    <ChatsWrapperForm>
      <ChatsFormMessage
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSend(e)}
      >
        <FormControl fullWidth>
          <OutlinedInput
            placeholder="Сообщение..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </FormControl>
        <ChatsMessegeButton
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
        >
          Отправить
        </ChatsMessegeButton>
      </ChatsFormMessage>
    </ChatsWrapperForm>
  );
}
