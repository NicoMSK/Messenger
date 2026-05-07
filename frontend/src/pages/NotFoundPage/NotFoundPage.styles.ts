import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFoundContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  textAlign: "center",
  backgroundColor: "#f5f5f5",
  padding: "20px",
});

export const ErrorTitleCode = styled("h1")({
  fontSize: "120px",
  fontWeight: 700,
  margin: 0,
  color: "#1976d2",
  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
});

export const ErrorTitle = styled("h2")({
  fontSize: "32px",
  margin: "16px 0",
  color: "#333",
});

export const ErrorText = styled("p")({
  fontSize: "18px",
  color: "#666",
  marginBottom: "32px",
});

export const ErrorLink = styled(Link)({
  padding: "10px 24px",
  backgroundColor: "#1976d2",
  color: "white",
  textDecoration: "none",
  borderRadius: "8px",
  fontSize: "16px",
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "#1565c0",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
});
