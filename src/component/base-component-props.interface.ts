export interface BaseComponentProps {
    className?: string;
    style?: {[key: string]: string};
    elementAttributes?: {[key: string]: string};

    /**
     * The component type ID.
     */
    __TYPE?: string;
}