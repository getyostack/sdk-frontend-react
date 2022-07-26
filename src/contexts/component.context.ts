import React, {ReactElement} from "react";
import {Component} from "../component/component.interface";
import {IDataContext} from "./data.context";

export interface ComponentContextState {
    component: Component;
    className: string|undefined|null;
    style: {[key: string]: string};
    elementAttributes: {[key: string]: string}; // e.g. data- attributes, including 'data-cid' and 'data-ctype'
    htmlElementProps: {[key: string]: string};
    configFromData: {[key:string]: any};

    getHtmlElProps: (...classNames: string[]) => {[key: string]: string};

    isConfigFromData: (name: string) => boolean;

    getSlotContents: (slotId: string) => ReactElement[]|null;

    wrapComponent: (treeItem: any, elKey?: string|number) => ReactElement;

    wrapChildComponents: (tree: any, slotId: string) => ReactElement[]|null;

    /**
     * Wraps the given children for each of the data array items retrieved from the parent data context
     * from the given array data field path. The wrapped children have the respective data array item
     * available as DataContext.
     *
     * @return [listOfDataWrappedChildren, isDataLoaded]
     */
    wrapAsDataListFromPath: (props: {
        arrayDataFieldPath: string|null|undefined; // uses root if not set
        itemAlias: string;
        parentDataContext: IDataContext|null|undefined;
        children: ReactElement|ReactElement[]|null|undefined
    }) => [ReactElement[], boolean];

    /**
     * Wraps the given children for each item in the given data array. The wrapped children have the
     * respective data array item available as DataContext.
     *
     * @return The list of data-wrapped children.
     */
    wrapAsDataListWithData: (props: {
        dataArray: any[];
        itemAlias: string;
        parentDataContext: IDataContext|null|undefined;
        children: ReactElement|ReactElement[]|null|undefined
    }) => ReactElement[];
}

export const ComponentContext = React.createContext<ComponentContextState|null>(null);