import {createContext} from "react";

export interface InstalledAppsContextData {
    getAppSettings: <T=any>(appName: string) => T|null;
}

export const InstalledAppsContext = createContext<InstalledAppsContextData>({
    getAppSettings: (appName: string) => null,
});