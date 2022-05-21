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

export const collectionRouteConfig: RouteConfig = {
  path: "collection",
  lazyLoadConfig: {
    compModuleName: "playlist",
    redirectRoute: "/collection/playlists"
  },
  children: [
    {
      path: "tracks",
      lazyLoadConfig: {
        compRoute: "/pages/playlist/Playlist"
      }
    },
    {
      path: ":type",
      lazyLoadConfig: {
        compRoute: "/pages/collection/Collection"
      }
    }
  ],
}