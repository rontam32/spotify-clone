import { lazy, Suspense } from "react";
import RouteConfig from "../models/Application/router";
import { injectAsyncReducer } from "../redux/store";
import { Navigate, Route } from "react-router-dom";
import { isArray } from "lodash";
import { Slice } from "@reduxjs/toolkit";

export const renderConfigs = (routeConfigs: RouteConfig) => {
  let LazyLoadElement: any = null;
  if (routeConfigs.element) {
    LazyLoadElement = routeConfigs.element;
  } else if (routeConfigs.lazyLoadConfig?.compRoute) {
    const { compModuleName, compRoute } = routeConfigs.lazyLoadConfig;
    LazyLoadElement = renderLazyLoad(compRoute, compModuleName);
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
            key={config.path}
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

  if (LazyLoadElement) {
    return (
      <Route
        key={routeConfigs.path}
        path={routeConfigs.path}
        element={
          routeConfigs.lazyLoadConfig?.redirectRoute ? <Navigate replace to={routeConfigs.lazyLoadConfig?.redirectRoute} /> :
            <Suspense fallback={<></>}>
              <LazyLoadElement />
            </Suspense>
        }
      >
        {routeChildren}
      </Route>
    );
  }

  return <Route key={routeConfigs.path} path={routeConfigs.path}>{routeChildren}</Route>;
};

export const renderLazyLoad = (compRoute: string, compModuleName: string) => {
  return lazy(() =>
    import(
      /* webpackChunkName: "[request]" */ `../modules/${compModuleName}`
    ).then((module) => {
      if (module.slice) {
        // define slice name in index file if redux slice name is different from module name
        //slice can be defined as single slice or array of slices

        if (isArray(module.slice)) {
          module.slice.map((slice: Slice) => {
            injectAsyncReducer(slice.name, slice.reducer);
          })
        } else {
          injectAsyncReducer(compModuleName || module.slice.name, module.slice.reducer);
        }
      }
      return import(`../modules/${compModuleName + compRoute}`);
    })
  );
};
