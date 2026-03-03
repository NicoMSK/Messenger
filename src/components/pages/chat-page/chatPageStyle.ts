import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
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

  fontSize: "18px",
  fontWeight: 600,

  borderBottom: "1px solid #eee",
});

export const ChatsList = styled("ul")({
  overflowY: "auto",
  flex: 1,
});

export const ChatsItem = styled("li")({
  padding: "8px",

  borderBottom: "1px solid #f0f0f0",
});

export const ChatsLink = styled("a")({
  padding: "14px 16px",
  fontSize: "14px",
  width: "100%",

  display: "flex",
  textDecoration: "none",
  color: "#333",
  cursor: "pointer",
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "#eaeaea",
  },
});

export const ChatsWrapperForm = styled("div")({
  padding: "12px",
  borderTop: "1px solid #ddd",

  backgroundColor: "#f0f8ff",
});

export const ChatsFormMessage = styled("form")({
  display: "flex",
  gap: "8px",
});

export const ChatsMessegeButton = styled(Button)({});

export const MessagesWrapper = styled("div")({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  flex: 1,

  overflowY: "auto",
  gap: "12px",
});

export const MessageItem = styled("div")({
  padding: "12px",
  maxWidth: "60%",

  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",

  "&:hover .message-time": {
    opacity: 1,
  },
});

export const MessageHeader = styled("div")({
  marginBottom: "6px",
  fontSize: "14px",

  display: "flex",
  justifyContent: "space-between",

  color: "#000",
});

export const MessageAuthor = styled("p")({
  margin: 0,
  fontWeight: 700,
});

export const MessageTime = styled("p")({
  margin: 0,
  opacity: 0,

  transition: "opacity 0.2s ease",

  "@media (max-width: 768px)": {
    opacity: 1,
  },
});

export const MessageText = styled("p")({
  margin: 0,
  fontSize: "16px",
});
