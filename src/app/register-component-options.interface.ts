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