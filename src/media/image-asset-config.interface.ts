import {ScreenSize} from "./screen-size.type";

export interface ImageAssetConfig {
    url: string;
    srcset?: string;
    sizes?: string;
    aspectRatio?: number;
    screens?: ScreenSize[];
    width?: number;
    height?: number;
    altText?: string;
    contentType?: string;
}