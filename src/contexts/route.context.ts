import React from "react";
import {PathMatch} from "../route/route-match";

export interface PageRouteInfo {
    pathMatch?: PathMatch|null
}

export const RouteContext = React.createContext<PageRouteInfo>({});