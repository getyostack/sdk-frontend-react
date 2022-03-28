const _w = window as any;
const yostack = _w._YoStack = _w._YoStack || { components: [] };

export const YoStack = {

    registerComponent: (typeId: string, component: Function, options?: RegisterComponentOptions) => {
        yostack.components.push({ typeId, component, options });
    }

};

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