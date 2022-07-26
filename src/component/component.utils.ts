import React, {ReactElement} from "react";
import {Component} from "./component.interface";
import {ComponentTypes} from "../constants";

export const forEachImmediateChild = function(component: Component, fn: (child: Component, index: number, slotId: string) => void) {
    if (!component?.slots?.length) {
        return;
    }

    for (const slot of component.slots) {
        for (let i = 0; i < slot.items.length; i++){
            const child = slot.items[i];
            fn(child, i, slot.id);
        }
    }
}

export const forEachComponentInTree = function(component: Component, fn: (child: Component, parent: Component|null, index: number, slotId: string|null) => void) {
    function _traverse(tree: Component, parentTree: Component|null, index: number, slotId: string|null) {
        if (!tree) {
            return;
        }

        fn(tree, parentTree, index, slotId);

        if (tree.slots?.length) {
            for (const slot of tree.slots) {
                for (let i = 0; i < slot.items.length; i++){
                    const child = slot.items[i];
                    _traverse(child, tree, i, slot.id);
                }
            }
        }
    }
    _traverse(component, null, 0, null);
}

export const findComponentsInTree = function(tree: Component, matchFn: (tree: Component) => boolean): any[] {
    if (!tree) {
        return [];
    }

    let result: any[] = [];

    if (matchFn(tree)) {
        result.push(tree);
    }

    if (tree.slots?.length) {
        for (const slot of tree.slots) {
            for (const childTree of slot.items) {
                result = result.concat(findComponentsInTree(childTree, matchFn));
            }
        }
    }

    return result;
}

export function findComponentInTree(tree: Component, matchFn: (tree: Component) => boolean): any {
    if (!tree) {
        return null;
    }

    if (matchFn(tree)) {
        return tree;
    }

    if (tree.slots?.length) {
        for (const slot of tree.slots) {
            for (const childTree of slot.items) {
                const match = findComponentInTree(childTree, matchFn);
                if (match) {
                    return match;
                }
            }
        }
    }

    return null;
}

export function unwrapComponent(reactComponent: any) {
    if (!React.isValidElement(reactComponent)) {
        return reactComponent;
    }
    reactComponent = reactComponent as ReactElement;
    if (ComponentTypes.ComponentWrapper  !== reactComponent.props.__TYPE) {
        return reactComponent;
    }
    const children = reactComponent.props.children;
    return children?.length ? children[0] : children;
}