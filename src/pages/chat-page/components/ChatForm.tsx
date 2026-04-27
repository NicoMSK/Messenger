import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import {
  ChatsFormMessage,
  ChatsMessegeButton,
  ChatsWrapperForm,
} from "./Messages.styles";
import { useState } from "react";
import { addMessage } from "../../../store/slices/chatSlice";
import { useAppDispatch } from "../../../store/store-hooks";

type ChatFormProp = { chatId: string };

export function ChatForm({ chatId }: ChatFormProp) {
  const [inputText, setInputText] = useState("");
  const dispatch = useAppDispatch();

  const handleSend = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timeMessage = new Date().toLocaleString().substring(0, 17);

    if (inputText.trim() === "") return;

    dispatch(
      addMessage({
        chatId,
        message: {
          id: Date.now(),
          text: inputText,
          author: "user-1",
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
