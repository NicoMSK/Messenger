import { styled } from "@mui/material/styles";
import { COLOR } from "../styleVariables";

export const ChatSection = styled("section")({
  display: "flex",
  height: "100dvh",

  backgroundColor: COLOR.background.main,
});

export const ChatsContent = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const EmptyChat = styled("div")({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const EmptyChatText = styled("p")({
  margin: "0",
  padding: "0",
  fontSize: "28px",
  fontWeight: "700",
});
