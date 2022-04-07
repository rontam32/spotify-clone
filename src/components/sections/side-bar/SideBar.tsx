import { List } from "@mui/material";
import { DrawerHeader } from "./SideBar.styles";
import classes from "./SideBar.module.scss";

import { MENU_ITEMS_CONFIG } from "./SideBar.config";
import CustomNavLink from "../../../components/common/custom-nav-link/CustomNavLink";
import { GenericPlaylist } from "../../../models/Playlist";
import { useSelector } from "react-redux";

const MenuList = () => {
  return (
    <List>
      {MENU_ITEMS_CONFIG.map((item) => (
        <CustomNavLink key={item.itemText} menuItem={item} />
      ))}
    </List>
  );
};

const SideBar = () => {
  const playlists = useSelector(
    (state: any) => state.playlist.playlists
  ) as GenericPlaylist.PlaylistDetail[];
  return (
    <div className={classes.drawer}>
      <DrawerHeader
        className="p-3"
        sx={{
          width: "100%",
        }}
      >
        <img
          src={`${window.location.origin}/logos/Spotify_Logo_RGB_White.png`}
          className={classes.logo}
        />
      </DrawerHeader>
      <div className={classes['menu-container']}>
        <MenuList />

        <List>
          {playlists.map((playlist) => (
            <CustomNavLink
              key={playlist.id}
              menuItem={{
                itemText: playlist.name,
                link: `/playlist/${playlist.id}`,
              }}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

export default SideBar;
