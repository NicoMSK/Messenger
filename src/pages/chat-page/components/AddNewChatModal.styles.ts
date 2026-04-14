import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { COLOR } from "../../styleVariables";
import { Stack } from "@mui/material";

export const Wrapper = styled("div")({
  padding: "25px",
  width: "420px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  backgroundColor: COLOR.background.loginWrapper,
  borderRadius: "15px",
  boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
});

export const Title = styled("h1")({
  margin: "0",
  marginBottom: "25px",
  padding: "5px 15px",
  fontSize: "28px",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
});

export const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  maxWidth: "320px",
  width: "100%",
});

export const ButtonWrapper = styled(Stack)({
  width: "100%",
  justifyContent: "space-between",
});

export const ButtonForm = styled(Button)({
  padding: "5px 30px",
  width: "max-content",
});
