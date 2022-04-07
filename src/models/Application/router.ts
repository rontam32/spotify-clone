import {ElementType, ReactNode} from "react";

interface RouteConfig {
    path: string;
    element?: ElementType;
    children?: RouteConfigChild[];
    lazyLoadConfig?: {
        compModuleName: string;
        compRoute?: string;
    }
    
}

interface RouteConfigChild {
    path: string;
    element?: ElementType;
    lazyLoadConfig?: {
        compRoute: string;
      }
}

export default RouteConfig;
