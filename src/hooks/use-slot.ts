import React, {Children, ReactNode} from "react";

export const useSlot = (slotName: string, children?: ReactNode|ReactNode[], fallback?: ReactNode): any => {
    if (Children.count(children) === 0) {
        return () => fallback;
    }

    const slotChild: any = Children.toArray(children).find(child => slotChild?.props?.name === slotName);

    if (slotChild) {
        return () => slotChild.props?.children;
    }

    if (fallback) {
        return () => fallback;
    }

    return null;
};

const Slot: React.FC<{name: string}> = () => null;

export const withSlot = (Component: any) => {
    Component.Slot = Slot;
    return Component;
};