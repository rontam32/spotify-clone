import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const BootstrapProfileButton = styled(Button)({
  display: "flex",
  color: "#fff",
  border: 0,
  alignItem: "center",
  backgroundColor: "rgba(0,0,0,.7)",
  gap: 8,
  borderRadius: "23px",
  padding: "5px 15px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#282828",
    boxShadow: "none",
  },
});

export const BootstrapLoginButton = styled(Button)({
  borderRadius: "500px",
  border: "2px solid transparent",
  fontSize: "12px",
  fontWeight: "700px",
  display: "inline-flex",
  color: "#181818",
  alignItem: "center",
  backgroundColor: "#fff",
  gap: 8,
  padding: "8px 34px",
  "&:hover": {
    transform: "scale(1.06)",
    backgroundColor: "#fff",
  },
  textTransform: "uppercase",
  whiteSpace: "nowrap",
});

