import { IconButton } from "@mui/material";
import classes from "./MoreOptionsButton.module.scss";
import Menu from '../../menu/Menu';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { GenericProps, MenuOptionItem } from "../../../../models/Application";

const MoreOptionsButton = ({ menuItems }: GenericProps<{
    menuItems: MenuOptionItem[]
}>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <IconButton className={classes["more-options"]} onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>

      <Menu archorElState={[anchorEl, setAnchorEl]} menuItems={menuItems} />
    </>
  );
};

export default MoreOptionsButton;
