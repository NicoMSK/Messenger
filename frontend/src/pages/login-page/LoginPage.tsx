import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginForm,
  LoginSection,
  LoginTitle,
  LoginWrapper,
  LoginButtonForm,
  LoginButtonWrapper,
} from "./LoginPage.styles";
import { useAppDispatch } from "../../store/store-hooks";
import { loginUserThunk } from "../../store/slices/authSlice";

export function LoginPage() {
  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputValue.trim().length === 0) {
      setInputIsEmpty(true);
      return;
    }
    await dispatch(loginUserThunk(inputValue));

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
    <LoginSection>
      <LoginContainer>
        <LoginWrapper>
          <LoginTitle>Добро пожаловать</LoginTitle>
          <LoginForm
            noValidate
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Введите ваше имя"
              variant="outlined"
              error={inputIsEmpty}
              value={inputValue}
              helperText={inputIsEmpty ? "Поле не может быть пустым" : " "}
              onChange={(e) => {
                handleNameChange(e);
              }}
            />
            <LoginButtonWrapper direction="row">
              <LoginButtonForm fullWidth variant="contained" type="submit">
                Войти
              </LoginButtonForm>
            </LoginButtonWrapper>
          </LoginForm>
        </LoginWrapper>
      </LoginContainer>
    </LoginSection>
  );
}
