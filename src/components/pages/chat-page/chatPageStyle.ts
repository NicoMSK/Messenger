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

export const ChatsWrapper = styled("div")({
  width: "280px",
  display: "flex",
  flexDirection: "column",

  overflowY: "auto",
  borderRight: "1px solid #ddd",

  backgroundColor: COLOR.background.chatsWrapper,
});

export const ChatsTitle = styled("h1")({
  margin: 0,
  padding: "16px",

  fontSize: "20px",
  fontWeight: 600,

  borderBottom: "1px solid #eee",
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
