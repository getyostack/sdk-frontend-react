export * from './common-utils';
export * from './audience';

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

/**
 * Options that can be provided when registering a component.
 */
export interface RegisterComponentOptions {

    /**
     * Whether the component can be overridden.
     */
    allowOverride?: boolean;

    /**
     * The tag used to wrap the component in the DOM that includes
     * data-cid, data-ctype, configured CSS classes, etc.
     *
     * Default: 'div'
     */
    wrapperTag?: string;

    /**
     * CSS classes to apply to the wrapper tag.
     */
    wrapperClass?: string;

    /**
     * Flag to indicate that the component's children/subtree should not be traversed and processed
     * in the usual way (i.e. each child component getting wrapped).
     * Components, which manage their subtree in a special way, should set this flag to true.
     * Note, that when this flag is set, the component is responsible for wrapping its children
     * as appropriate.
     */
    preventSubtreeProcessing?: boolean;

    /**
     * Whether the component should be rendered client-side only, i.e. not server-side.
     */
    clientOnly?: boolean;

}

export interface BaseComponentProps {
    className?: string;
    $extra?: {
        data?: any;
        cssStyles?: string; // free-style CSS styles
        styles?: {[key:string]: string}; // style editor CSS styles
        component?: any;
        componentElementProps?: {[key: string]: string};
        elProps: (...classNames: string[]) => {[key: string]: string};
        children?: any;
        getSlotContents?: (slotId: string) => any[]|null;
    }
}

export interface AppContext<Settings=any> {
    settings: Settings;
}

export type AudienceCriteriaEvaluatorFn = (criteria: any, context: AudienceEvaluationContext) => boolean;

export type DataRequestHandlerFn<Settings=any, Options=any> = (collectionId: string, options: Options, appContext: AppContext<Settings>) => Promise<DataRequestResult>;

export type DataRequestResult = Array<any> | any | PagedResult;

export interface PagedResult<T=any> {
    results: T[];
    page: PagedResultInfo;
}

export interface PagedResultInfo {
    currentPage: number; // 1-based
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

export interface AudienceEvaluationContext {
    user?: any;
    cart?: any;
    customEventData?: { [key: string]: string };
    [key: string]: any;
}

export interface ImageComponentConfig {
    images?: ImageAssetConfig[];
    responsive?: boolean;
    lazyLoad?: boolean;
    ratioBox?: boolean;
    altText?: string;
}

export interface ImageAssetConfig {
    url: string;
    srcset?: string;
    sizes?: string;
    aspectRatio?: number;
    screens?: ScreenSize[];
    width?: number;
    height?: number;
    altText?: string;
    contentType?: string;
}

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';