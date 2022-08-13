import React from "react";
import {PagedResultInfo} from "../request/paged-result-info.interface";
import {DataRequestResult} from "../app/app-setup-context.interface";

export const DataContext = React.createContext<IDataContext|null>(null);

export interface IDataContext {

    addDataSet(dataSet: DataSet): void;

    cloneWithNewDataSet(dataSet: DataSet): IDataContext;

    clone(): IDataContext;

    getDataSets(): DataSet[];

    getDataSet(name: string): DataSet|undefined;

    hasDataSets(): boolean;

    /**
     * Returns the data value at the given data path.
     *
     * @param pathToValue The data field path from which to read the data value.
     * @return [value, isDataLoaded, promise]
     */
    getDataValue(pathToValue: string | null | undefined): [any, boolean, Promise<IDataContext>];

    /**
     * Returns the data array at the given path that can be iterated over.
     *
     * @param pathToArrayField Path to the array field.
     * @return [array, isDataLoaded]
     */
    getDataArray(pathToArrayField: string | null | undefined): [any[], boolean];

    getFlatData(): { [p: string]: any };

    isDataSetLoaded(dataContextId: string, dataContext?: IDataContext | null): boolean;

}

export interface DataSet {
    name: string;
    data: DataRequestResult<any>;
    flatData?: {[key: string]: any};
    page?: PagedResultInfo;
    setPage: (page: number, options?: { append: boolean }) => void;
}