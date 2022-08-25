import React from "react";
import {PathMatch} from "../route/route-match";

export interface PageRouteInfo {
    url?: string;
    pathname?: string;
    pathMatch?: PathMatch|null;
}

export const RouteContext = React.createContext<PageRouteInfo>({});