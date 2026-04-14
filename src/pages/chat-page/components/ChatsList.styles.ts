import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

type ChatsLinkProps = {
  isActive: boolean;
};

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
