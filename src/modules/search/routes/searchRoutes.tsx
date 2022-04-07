import RouteConfig from "../../../models/Application/router";

export const searchRouteConfig: RouteConfig = {
  path: "search",
  lazyLoadConfig: {
    compModuleName: "search",
    compRoute: "/pages/search/Search",
  },
  children: [
    {
      path: ":query/:type",
      lazyLoadConfig: {
        compRoute: "/pages/search-result-by-type/SearchResultByType",
      }
    },
    {
      path: ":query",
      lazyLoadConfig: {
        compRoute: "/pages/search-result/SearchResult",
      },
    },
  ],
};

