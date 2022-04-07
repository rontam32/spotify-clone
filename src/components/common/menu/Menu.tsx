import { useState } from "react";
import { GenericProps, MenuOptionItem } from "../../../models/Application";
import {
  StyledMenuItem,
  StyledMenu,
  StyledSubMenu,
  StyledSubMenuItem,
} from "./Menu.styles";

interface MenuProps {
  archorElState: [
    HTMLElement | null,
    React.Dispatch<React.SetStateAction<HTMLElement | null>>
  ];
  menuItems: MenuOptionItem[];
}
const Menu = ({ menuItems, archorElState }: GenericProps<MenuProps>) => {
  const [subItemsAnchorEl, setsubItemsAnchorEl] = useState<{
    [key: string]: null | HTMLElement;
  }>({});

  const handleSubitemClick = (
    event: React.MouseEvent<HTMLElement>,
    menuItemId: string
  ) => {
    setsubItemsAnchorEl((prevState) => {
      return {
        ...prevState,
        [menuItemId]: event.currentTarget,
      };
    });
  };

  const handleSubitemClose = (menuItemId: string) => {
    setsubItemsAnchorEl((prevState) => {
      return {
        ...prevState,
        [menuItemId]: null,
      };
    });
  };

  const handleClose = () => {
    archorElState[1](null);
    setsubItemsAnchorEl((prevState) => {
      return {};
    });
  };

  const mouseLeaveHandler = (itemId: string) => {
    const checkIfEnterSubItems = Array.from(document.querySelectorAll(':hover')).some(element => {
      return element.id === 'fade-sub-menu'
    });

    if (!checkIfEnterSubItems) {
      handleSubitemClose(itemId);
    }
  }

  const open = Boolean(archorElState[0]);
  if (menuItems.length) {
    return (
      <>
        <StyledMenu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={archorElState[0]}
          open={open}
          onClose={handleClose}
        >
          {menuItems.map((item) => {
            if (item.subItems) {
              return (
                <div key={item.id}>
                  <StyledMenuItem
                    key={item.id}
                    onMouseEnter={(event: React.MouseEvent<HTMLElement>) => {
                      handleSubitemClick(event, item.id);
                    }}
                    onMouseLeave={() => { mouseLeaveHandler(item.id) }}
                  >
                    {item.name}
                  </StyledMenuItem>

                  <StyledSubMenu
                    disableAutoFocus={true}
                    disableAutoFocusItem={true}
                    id="fade-sub-menu"
                    anchorEl={subItemsAnchorEl[item.id]}
                    open={Boolean(subItemsAnchorEl[item.id])}
                    onClose={() => {
                      handleSubitemClose(item.id);
                    }}
                    sx={{
                      pointerEvents: 'none !important'
                    }}
                  >
                    {item.subItems.map((subItem) => {
                      return (
                        <StyledSubMenuItem
                          sx={{ pointerEvents: 'auto !important' }}
                          key={subItem.id}
                          onClick={item.onClick}
                        >
                          {subItem.name}
                        </StyledSubMenuItem>
                      );
                    })}
                  </StyledSubMenu>
                </div>
              );
            }
            return (
              <StyledMenuItem 
                key={item.id} 
                onClick={item.onClick}
              >
                {item.name}
              </StyledMenuItem>
            );
          })}
        </StyledMenu>
      </>
    );
  }

  return null;
};

export default Menu;
