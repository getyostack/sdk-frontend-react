import React from "react";
import {DEFAULT_IMAGE_SIZES, ImageSize} from "../media/image-sizes";
import {DEFAULT_MEDIA_BREAKPOINTS, MediaBreakpoints} from "../media/media-breakpoints";
import {YoCache} from "../cache/yo-cache";

export interface SiteInfo {
    id: string;
    cdnDomain: string;
    cdnMediaPath: string;
    imageSizes?: ImageSize[];
    breakpoints: MediaBreakpoints;
    cache: YoCache;
}

export const SiteContext = React.createContext<SiteInfo>({
    id: '',
    cdnDomain: '',
    cdnMediaPath: '',
    imageSizes: DEFAULT_IMAGE_SIZES,
    breakpoints: DEFAULT_MEDIA_BREAKPOINTS,
    cache: new YoCache(),
});