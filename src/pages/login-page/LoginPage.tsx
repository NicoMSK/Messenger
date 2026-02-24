import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./login-page.css";

export function LoginPage() {
  const [chat, setChat] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setChat(event.target.value as string);
  };

  return (
    <section className="login">
      <div className="container login__container">
        <div className="login__wrapper">
          <h1 className="login__title">Выбор чата</h1>
          <Box
            className="login__form"
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              maxWidth: 320,
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Ваше имя"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="chat-select-label">Выбор чата</InputLabel>
              <Select
                labelId="chat-select-label"
                id="chat-select"
                value={chat}
                label="Выбор чата"
                onChange={handleChange}
              >
                <MenuItem value={1}>#1</MenuItem>
                <MenuItem value={2}>#2</MenuItem>
                <MenuItem value={3}>#3</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row">
              <Button
                fullWidth
                variant="contained"
                sx={{
                  marginTop: "10px",
                  width: 200,
                }}
              >
                Войти
              </Button>
            </Stack>
          </Box>
        </div>
      </div>
    </section>
  );
}
