import React from "react";
import {PathMatch} from "../route/route-match";

export interface PageRouteInfo {
    pathMatch?: PathMatch
}

export const RouteContext = React.createContext<PageRouteInfo>({});