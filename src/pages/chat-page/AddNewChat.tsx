import { Dialog, TextField } from "@mui/material";
import {
  ButtonForm,
  ButtonWrapper,
  Form,
  Title,
  Wrapper,
} from "./AddNewChatStyle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type AddChatProp = {
  openDialog: boolean;
  addChat: (inputValue: string) => void;
  closeForm: () => void;
};

export function AddNewChat({ openDialog, addChat, closeForm }: AddChatProp) {
  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputValue.trim().length === 0) {
      setInputIsEmpty(true);
      return;
    }

    setInputIsEmpty(false);
    setInputValue("");
    navigate("/chats");
  }

  function handleNameChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const value = event.target.value;

    setInputValue(value);

    if (value.trim().length > 0) {
      setInputIsEmpty(false);
    }
  }

  return (
    <Dialog open={openDialog} onClose={closeForm}>
      <Wrapper>
        <Title>Название нового чата</Title>
        <Form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Введите название чата"
            variant="outlined"
            error={inputIsEmpty}
            value={inputValue}
            helperText={inputIsEmpty ? "Поле не может быть пустым" : " "}
            onChange={(e) => {
              handleNameChange(e);
            }}
          />
          <ButtonWrapper direction="row">
            <ButtonForm
              fullWidth
              variant="outlined"
              type="button"
              onClick={closeForm}
            >
              Отмена
            </ButtonForm>
            <ButtonForm
              fullWidth
              variant="contained"
              type="submit"
              onClick={() => addChat(inputValue)}
            >
              Создать
            </ButtonForm>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Dialog>
  );
}
