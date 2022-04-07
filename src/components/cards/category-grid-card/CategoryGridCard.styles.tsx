import { styled } from "@mui/material/styles";

export const MediaContainer = styled("div")(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#282828",
    cursor: "pointer",
  },
}));
