export interface Component {

    /*
     * Unique assignment UUID that identifies the item in the tree. Multiple tree items that represent
     * the same component instance will have different assignment UUIDs.
     */
    treeAssignmentId: string;

    /* The component instance ID. */
    id: string;

    /* The component type ID. */
    typeId: string;

    /**
     * ID of the component that is being extended.
     */
    extend?: string;

    /**
     * The slots available on the component, containing child components.
     */
    slots?: ComponentSlot[];

    /**
     * The component configuration.
     */
    config?: {[key: string]: any};

    /**
     * Slugs used for URL route matching.
     */
    slugs?: string[];

    /**
     * CSS classes.
     */
    cssClass?: string;

    /**
     * Free-style CSS styles.
     */
    cssStyles?: string;

    /**
     * CSS styles created via the style builder/editor.
     */
    styles?: {[key: string]: any};

    /**
     * Custom element attributes.
     */
    elementAttributes?: {[name:string]: string};

    /**
     * IDs of assigned campaigns.
     */
    campaigns?: string[];

    /**
     * IDs of allowed audiences.
     */
    allowedAudiences?: string[];

    /**
     * IDs of blocked audiences.
     */
    blockedAudiences?: string[];

    /**
     * IDs of explicit allowed audiences.
     */
    explicitAllowedAudiences?: string[];

}

export interface ComponentSlot {
    id: string;
    items: Component[];
}