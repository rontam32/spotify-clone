import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { ListItemButton, ListItemText } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MenuItem } from "../../../models/Application/side-bar";
import classes from "./CustomNavLink.module.scss";
import { GenericProps } from "../../../models/Application";

const CustomNavLink = ({menuItem}: GenericProps<{menuItem: MenuItem}>) => {
    const resolved = useResolvedPath(menuItem.link);
    const match = useMatch({ path: menuItem.matchPattern ? `${menuItem.matchPattern}/*` : `${resolved.pathname}/*`, end: true });
    return (
        <NavLink className={classes.link} to={menuItem.link}>
                  <ListItemButton
      key={menuItem.itemText}
      sx={{
        "& .MuiListItemIcon-root": {
          minWidth: "36px",
          color: match ? "#fff" : "#b3b3b3",
        },
        "& .MuiListItemText-root": {
          color: match ? "#fff" : "#b3b3b3",
          span: {
            fontSize: "14px",
            fontWeight: 700,
          },
        },
        "&:hover": {
          "& .MuiListItemText-root": {
            color: "white",
          },
          "& .MuiListItemIcon-root": {
            color: "white",
          },
        },
      }}
    >
      {menuItem.iconCmp && <ListItemIcon>{menuItem.iconCmp}</ListItemIcon>}
        <ListItemText primary={menuItem.itemText} />
    </ListItemButton>
        </NavLink>
    );
}

export default CustomNavLink;