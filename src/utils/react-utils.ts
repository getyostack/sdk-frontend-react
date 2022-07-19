import React, {ReactElement, ReactNode} from "react";

export function hasChildren(children?: ReactNode | ReactNode[]) {
    return children && React.Children.toArray(children).length > 0;
}

export function hasPropsWithChildren(props: any) {
    return hasChildren(props?.children);
}

export function getChildren(props: any) {
    return props?.children ? React.Children.toArray(props.children) : [];
}

export function forEachChildReactElement(children: any, fn: (reactEl: ReactElement) => void) {
    React.Children.forEach(children, (child: React.ReactNode) => {
        if (React.isValidElement(child)) {
            fn(child);
        }
    });
}

export function forEachChildReactNode(children: any, fn: (reactEl: ReactNode, isReactElement: boolean) => void) {
    React.Children.forEach(children, (child: React.ReactNode) => {
        const isElement = React.isValidElement(child);
        fn(child, isElement);
    });
}

export function isDOMTypeElement(element: any) {
    return React.isValidElement(element) && typeof element.type === 'string';
}