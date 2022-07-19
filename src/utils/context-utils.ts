import {DEFAULT_MEDIA_BREAKPOINTS, MediaBreakpoints} from "../media/media-breakpoints";
import {ScreenSize, screenSizes} from "../media/screen-size.type";

export function isClient() {
    return 'undefined' !== typeof window;
}

export function isServer() {
    return !isClient();
}

export function getCurrentScreenSize(breakpoints?: MediaBreakpoints): ScreenSize {
    breakpoints = breakpoints || DEFAULT_MEDIA_BREAKPOINTS;
    const actualScreenWidth = window.innerWidth;
    if (actualScreenWidth > breakpoints.xxl) { return 'xxl'; }
    if (actualScreenWidth > breakpoints.xl) { return 'xl'; }
    if (actualScreenWidth > breakpoints.lg) { return 'lg'; }
    if (actualScreenWidth > breakpoints.md) { return 'md'; }
    if (actualScreenWidth > breakpoints.sm) { return 'sm'; }
    return 'xs';
}

export function isCurrentScreenSizeLowerThan(screenSize: ScreenSize): boolean {
    const actualScreenSize = getCurrentScreenSize();
    return screenSizes.indexOf(actualScreenSize) < screenSizes.indexOf(screenSize);
}

export function isCurrentScreenSizeLowerThanOrEqualTo(screenSize: ScreenSize): boolean {
    const actualScreenSize = getCurrentScreenSize();
    return screenSizes.indexOf(actualScreenSize) <= screenSizes.indexOf(screenSize);
}

export function isCurrentScreenSizeGreaterThan(screenSize: ScreenSize): boolean {
    const actualScreenSize = getCurrentScreenSize();
    return screenSizes.indexOf(actualScreenSize) > screenSizes.indexOf(screenSize);
}

export function isCurrentScreenSizeGreaterThanOrEqualTo(screenSize: ScreenSize): boolean {
    const actualScreenSize = getCurrentScreenSize();
    return screenSizes.indexOf(actualScreenSize) >= screenSizes.indexOf(screenSize);
}