import React, { useMemo, useState } from "react";
import classes from "./UserProfileButton.module.scss";
import Avatar from "@mui/material/Avatar";
import Menu from '../../../common/menu/Menu';
import { BootstrapProfileButton, BootstrapLoginButton} from './UserProfileButton.styles';
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

const MENU_ITEMS = (logoutHandler: () => void) => {
  return [
    {
    onClick: () => {},
    name: 'Profile',
    id: 'profile'
    },
    {
      onClick: () => {},
      name: 'My account',
      id: 'my_account',
    },
    {
      onClick: () => {
        logoutHandler();
      },
      name: 'Logout',
      id: 'logout'
    }
  ];
}

const UserProfileButton = () => {
  const {userProfile, isUserProfileLoaded, auth} = useSelector((state: any) => state.auth, isEqual);

  const loginHandler = () => {
    auth?.signinRedirect();
  };

  const logoutHandler = () => {
    auth?.logout();
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const imageSrc = userProfile?.images[0].url;
  
  return useMemo(() => {
    if (isUserProfileLoaded) {
      if (userProfile) {
        return (
          <React.Fragment>
            <BootstrapProfileButton onClick={handleClick}>
              <span>{userProfile?.display_name}</span>
              <Avatar src={imageSrc} className={classes.avatar} />
            </BootstrapProfileButton>
  
          <Menu archorElState={[anchorEl, setAnchorEl]} menuItems={MENU_ITEMS(logoutHandler)}/>
          </React.Fragment>
        );
      } else {
        return <BootstrapLoginButton onClick={loginHandler}>Log In</BootstrapLoginButton>;
      }
    } else {
      return null;
    }
  }, [userProfile, open, isUserProfileLoaded, auth]);
};

export default UserProfileButton;
