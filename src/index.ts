/**
 * An app setup context object is passed to each app module's `init` function.
 */
export interface AppSetupContext {
    registerComponent: (typeId: string, component: Function, options?: RegisterComponentOptions) => boolean;
    registerAudienceCriteria(info: AudienceCriteriaInfo): boolean;
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

export interface AudienceCriteriaInfo {
    id: string;
    evaluateFn: AudienceCriteriaEvaluatorFn;
    requiredContext?: string[];
}

export type AudienceCriteriaEvaluatorFn = (criteria: any, context: AudienceEvaluationContext) => boolean;

export interface AudienceEvaluationContext {
    user?: any;
    cart?: any;
    customEventData?: { [key: string]: string };
    [key: string]: any;
}