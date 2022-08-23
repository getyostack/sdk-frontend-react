import {RegisterComponentOptions} from "./register-component-options.interface";
import {AppContext} from "./app-context.interface";
import {PagedResultInfo} from "../request/paged-result-info.interface";
import {AudienceCriteriaEvaluatorFn} from "../audience/audience-criteria-info.interface";

export type DataRequestHandlerFn<Settings=any, Options=any, T=any> = (
    collectionId: string,
    options: Options,
    appContext: AppContext<Settings>,
    pagination?: PaginationInfo
) => Promise<DataRequestResult<T>|null|undefined>;

export interface DataRequestResult<T> {
    results: T[];
    page?: PagedResultInfo;
}

export interface PaginationInfo {
    page?: number;
    pageSize?: number;
}

/**
 * An app setup context object is passed to each app module's `init` function.
 */
export interface AppSetupContext {
    registerComponent(
        typeId: string,
        component: Function,
        options?: RegisterComponentOptions
    ): boolean;

    registerAudienceCriteriaEvaluator(
        audienceCriteriaId: string,
        evaluateFn: AudienceCriteriaEvaluatorFn,
        requiredContext?: string[]
    ): boolean;

    registerDataRequestHandler(
        dataProviderId: string,
        handlerFn: DataRequestHandlerFn,
        options?: {
            cache?: {
                disable?: boolean;
                defaultTtlMs?: number;
            }
        }
    ): boolean;
}