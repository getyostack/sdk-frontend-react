import {BaseComponentProps} from "../component/base-component-props.interface";
import {ImageAssetConfig} from "./image-asset-config.interface";

export interface ImageComponentConfig extends BaseComponentProps {
    images?: ImageAssetConfig|ImageAssetConfig[]|string;
    responsive?: boolean;
    lazyLoad?: boolean;
    ratioBox?: boolean;
    altText?: string;
    uniqueRatioBoxClass?: string;
}