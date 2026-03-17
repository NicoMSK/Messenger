import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  ChatsFormMessage,
  ChatsMessegeButton,
  ChatsWrapperForm,
} from "./chatPageStyle";

export function ChatForm() {
  return (
    <ChatsWrapperForm>
      <ChatsFormMessage noValidate autoComplete="off">
        <FormControl fullWidth>
          <OutlinedInput placeholder="Сообщение..." />
        </FormControl>
        <ChatsMessegeButton variant="contained" type="submit">
          Отправить
        </ChatsMessegeButton>
      </ChatsFormMessage>
    </ChatsWrapperForm>
  );
}
