import React from "react";

export const DataContext = React.createContext<IDataContext|null>(null);

export interface IDataContext {

    addDataSet(dataSet: DataSet): void;

    cloneWithNewDataSet(dataSet: DataSet): IDataContext;

    clone(): IDataContext;

    getDataSets(): any[];

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

    getFlattenedData(): { [p: string]: any };

    getSortedDataSets(): any[];
}

export interface DataSet {
    name: string;
    data: any;
    flatData?: {[key: string]: any};
}