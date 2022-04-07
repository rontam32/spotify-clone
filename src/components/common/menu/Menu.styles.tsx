import { styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const StyledMenuItem = styled(MenuItem)({
    color: "#fff",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,.1)",
    },
  });

  export const StyledSubMenuItem = styled(MenuItem)({
    color: "#fff",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,.1)",
      width: '100%'
    },
  });
  
  export const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      backgroundColor: "#282828 !important",
      color: "#fff",
      fontSize: "14px",
    },
  }));

  export const StyledSubMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      width: 175,
      backgroundColor: "#282828 !important",
      color: "#fff",
      fontSize: "14px",
    },
  }));
  