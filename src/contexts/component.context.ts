import React, {ReactElement} from "react";

export interface ComponentContextState {
    component: any;
    className: string|undefined|null;
    style: {[key: string]: string};
    elementAttributes: {[key: string]: string}; // e.g. data- attributes, including 'data-cid' and 'data-ctype'
    htmlElementProps: {[key: string]: string};
    getHtmlElProps: (...classNames: string[]) => {[key: string]: string};
    configFromData: {[key:string]: any};
    isConfigFromData: (name: string) => boolean;
    getSlotContents: (slotId: string) => ReactElement[]|null;
}

export const ComponentContext = React.createContext<ComponentContextState|null>(null);