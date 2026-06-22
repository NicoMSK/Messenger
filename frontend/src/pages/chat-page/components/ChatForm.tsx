import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import {
  ChatsFormMessage,
  ChatsMessegeButton,
  ChatsWrapperForm,
} from "./Messages.styles";
import { useState } from "react";
import { addMessage } from "../../../store/slices/messagesSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store-hooks";
import type { ChatProps } from "../../../shared/types/chat.types";
import { sendMessageToServer } from "../../../api/socket";
import { getCurrentUserName } from "../../../store/selectors";

export function ChatForm({ chatId }: ChatProps) {
  const [inputText, setInputText] = useState("");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUserName);

  const handleSend = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timeMessage = new Date().toLocaleString().substring(0, 17);

    if (inputText.trim() === "") return;
    if (!currentUser) {
      return null;
    }
    sendMessageToServer(chatId, currentUser, inputText);

    dispatch(
      addMessage({
        chatId,
        message: {
          id: Date.now(),
          text: inputText,
          author: currentUser,
          time: timeMessage,
        },
      }),
    );

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
