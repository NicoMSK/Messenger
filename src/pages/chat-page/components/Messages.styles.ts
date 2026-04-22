import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const ChatsWrapperForm = styled("div")({
  marginTop: "auto",
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

export const MessageTime = styled("p")({
  margin: 0,
  opacity: 0,

  transition: "opacity 0.2s ease",

  "@media (max-width: 768px)": {
    opacity: 1,
  },
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

export const MessageText = styled("p")({
  margin: 0,
  fontSize: "16px",
});
