import {RegisterComponentOptions} from "./register-component-options.interface";
import {AppContext} from "./app-context.interface";
import {PagedResult} from "../request/paged-result.interface";
import {AudienceCriteriaEvaluatorFn} from "../audience/audience-criteria-info.interface";

export type DataRequestHandlerFn<Settings=any, Options=any> =
    (collectionId: string, options: Options, appContext: AppContext<Settings>) => Promise<DataRequestResult>;

export type DataRequestResult = Array<any> | any | PagedResult;

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
        handlerFn: DataRequestHandlerFn
    ): boolean;
}