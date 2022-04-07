import RouteConfig from "../../../models/Application/router";

export const playlistRouteConfig: RouteConfig = {
    path: "playlist",
    lazyLoadConfig: {
        compModuleName: "playlist",
    },
    children: [
      {
        path: ":playlistId",
        lazyLoadConfig: {
          compRoute: "/pages/playlist/Playlist"
        }
      }
    ],
  };