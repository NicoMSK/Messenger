import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Section,
  Title,
  Wrapper,
  ButtonForm,
  ButtonWrapper,
} from "../components/FormComponentStyle";

type FormProp = {
  title: string;
  label: string;
  addButton: string;
  cancelButton?: string;
  addInputValue: (inputValue: string) => void;
  closeForm?: () => void;
};

export function FormComponent({
  title,
  label,
  addButton,
  cancelButton,
  addInputValue,
  closeForm,
}: FormProp) {
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
    <Section>
      <Container>
        <Wrapper>
          <Title>{title}</Title>
          <Form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
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
            <ButtonWrapper direction="row">
              {cancelButton && (
                <ButtonForm
                  fullWidth
                  variant="outlined"
                  type="button"
                  onClick={closeForm}
                >
                  {cancelButton}
                </ButtonForm>
              )}
              <ButtonForm
                fullWidth
                variant="contained"
                type="submit"
                onClick={() => addInputValue(inputValue)}
              >
                {addButton}
              </ButtonForm>
            </ButtonWrapper>
          </Form>
        </Wrapper>
      </Container>
    </Section>
  );
}
