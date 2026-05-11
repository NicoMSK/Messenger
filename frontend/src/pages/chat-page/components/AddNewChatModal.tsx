import { Dialog, TextField } from "@mui/material";
import {
  ButtonForm,
  ButtonWrapper,
  Form,
  Title,
  Wrapper,
} from "./AddNewChatModal.styles";
import { useState } from "react";

type AddNewChatModalProp = {
  openDialog: boolean;
  addChat: (inputValue: string) => void;
  closeForm: () => void;
};

export function AddNewChatModal({
  openDialog,
  addChat,
  closeForm,
}: AddNewChatModalProp) {
  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputValue.trim().length === 0) {
      setInputIsEmpty(true);
      return;
    }

    setInputIsEmpty(false);
    addChat(inputValue);
    setInputValue("");
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
    <Dialog
      open={openDialog}
      onClose={() => {
        closeForm();
        setInputValue("");
      }}
    >
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
              onClick={() => {
                closeForm();
                setInputValue("");
              }}
            >
              Отмена
            </ButtonForm>
            <ButtonForm fullWidth variant="contained" type="submit">
              Создать
            </ButtonForm>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Dialog>
  );
}
