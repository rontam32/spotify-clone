import {ElementType, ReactNode} from "react";
import { StringLiteralLike } from "typescript";

interface RouteConfig {
    path: string;
    element?: ElementType;
    children?: RouteConfigChild[];
    lazyLoadConfig?: {
        compModuleName: string;
        compRoute?: string;
        redirectRoute?: string;
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
