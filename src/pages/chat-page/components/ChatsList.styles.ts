import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { COLOR } from "../../styleVariables";

type ChatsLinkProps = {
  isActive: boolean;
};

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

export const ChatsCurrentUser = styled("div")({
  margin: 0,
  padding: "16px",

  fontSize: "14px",

  borderBottom: "1px solid #eee",
});

export const ChatsCurrentUserName = styled("span")({
  fontSize: "16px",
  fontWeight: 700,
});

export const ChatsList = styled("ul")({
  overflowY: "auto",
  flex: 1,
});

export const ChatsItem = styled("li")({
  padding: "8px",

  borderBottom: "1px solid #f0f0f0",
});

export const ChatsLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<ChatsLinkProps>(({ isActive }) => ({
  padding: "14px 16px",
  fontSize: "16px",
  width: "100%",

  display: "flex",
  textDecoration: "none",
  color: "#333",
  cursor: "pointer",
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "#eaeaea",
  },

  backgroundColor: isActive ? "#e3ff73" : "transparent",
}));
