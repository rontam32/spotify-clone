import RouteConfig from "../models/Application/router";
import { collectionRouteConfig, playlistRouteConfig } from "../modules/playlist/routes/playlistRoutes";
import { searchRouteConfig } from "../modules/search/routes/searchRoutes";

const rootRoutes: RouteConfig[] = [
    searchRouteConfig,
    playlistRouteConfig,
    collectionRouteConfig
];

export default rootRoutes;