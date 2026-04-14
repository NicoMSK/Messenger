import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { COLOR } from "../styleVariables";
import { Stack } from "@mui/material";

export const LoginSection = styled("section")({
  backgroundColor: COLOR.background.main,
});

export const LoginContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const LoginWrapper = styled("div")({
  padding: "25px",
  width: "420px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  backgroundColor: COLOR.background.loginWrapper,
  borderRadius: "15px",
  boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
});

export const LoginTitle = styled("h1")({
  margin: "0",
  marginBottom: "25px",
  padding: "5px 15px",
  fontSize: "28px",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",

  backgroundColor: COLOR.background.title,
  borderRadius: "10px",
  boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
});

export const LoginForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  maxWidth: "320px",
  width: "100%",
});

export const LoginButtonWrapper = styled(Stack)({
  width: "100%",
  justifyContent: "space-between",
});

export const LoginButtonForm = styled(Button)({});
