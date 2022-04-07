import { lazy, Suspense } from "react";
import RouteConfig from "../models/Application/router";
import { injectAsyncReducer } from "../redux/store";
import { Route } from "react-router-dom";

export const renderConfigs = (routeConfigs: RouteConfig) => {
  let LazyLoadElement: any = null;
  if (routeConfigs.lazyLoadConfig?.compRoute) {
    const { compModuleName, compRoute } = routeConfigs.lazyLoadConfig;
    LazyLoadElement = renderLazyLoad(compRoute, compModuleName);
  } else if (routeConfigs.element) {
    LazyLoadElement = routeConfigs.element;
  }

  const routeChildren = (
    <>
      {routeConfigs?.children?.map((config) => {
        let ChildLazyLoadElement: any = null;
        if (config.lazyLoadConfig) {
          const { compRoute } = config.lazyLoadConfig;
          ChildLazyLoadElement = renderLazyLoad(
            compRoute,
            routeConfigs.lazyLoadConfig!.compModuleName
          );
        } else {
          ChildLazyLoadElement = config.element;
        }
        return (
          <Route
            path={config.path}
            element={
              <Suspense fallback={<></>}>
                <ChildLazyLoadElement />
              </Suspense>
            }
          ></Route>
        );
      })}
    </>
  );

  if (LazyLoadElement)
    return (
      <Route
        path={routeConfigs.path}
        element={
          <Suspense fallback={<></>}>
            <LazyLoadElement />
          </Suspense>
        }
      >
        {routeChildren}
      </Route>
    );

  return <Route path={routeConfigs.path}>{routeChildren}</Route>;
};

export const renderLazyLoad = (compRoute: string, compModuleName: string) => {
  return lazy(() =>
    import(
      /* webpackChunkName: "[request]" */ `../modules/${compModuleName}`
    ).then((module) => {
      if (module.slice) {
        // define slice name in index file if redux slice name is different from module name
        injectAsyncReducer(module.sliceName || compModuleName, module.slice.reducer);
      }
      return import(`../modules/${compModuleName + compRoute}`);
    })
  );
};
