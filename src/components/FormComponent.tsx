import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginForm,
  LoginSection,
  LoginTitle,
  LoginWrapper,
  LoginButton,
} from "./pages/login-page/login-page";

export function FormComponent({ title, label, addButton, cancelButton }) {
  const [nameLength, setNameLength] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputValue.trim().length === 0) {
      setNameLength(true);
      return;
    }

    setNameLength(false);
    setInputValue("");
    navigate("/chats");
  }

  function handleNameChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const value = event.target.value;

    setInputValue(value);

    if (value.trim().length > 0) {
      setNameLength(false);
    }
  }

  return (
    <LoginSection>
      <LoginContainer>
        <LoginWrapper>
          <LoginTitle>{title}</LoginTitle>
          <LoginForm
            noValidate
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label={label}
              variant="outlined"
              error={nameLength}
              value={inputValue}
              helperText={nameLength ? "Поле не может быть пустым" : ""}
              onChange={(e) => {
                handleNameChange(e);
              }}
            />
            <Stack direction="row">
              <LoginButton fullWidth variant="outlined" type="submit">
                {cancelButton}
              </LoginButton>
              <LoginButton fullWidth variant="contained" type="submit">
                {addButton}
              </LoginButton>
            </Stack>
          </LoginForm>
        </LoginWrapper>
      </LoginContainer>
    </LoginSection>
  );
}
