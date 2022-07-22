import React, {useContext, useEffect, useState} from 'react';
import {ImageComponentConfig} from "../../media/image-component-config.interface";
import {MediaBreakpoints} from "../../media/media-breakpoints";
import {ImageAssetConfig} from "../../media/image-asset-config.interface";
import {hashCode} from "../../utils/common-utils";
import {CssClassBuilder} from "../../utils/css-class-builder";
import {SiteContext} from "../../contexts/site.context";
import {ConditionalWrapper} from "../support/conditional-wrapper.component";

/**
 * Image UI component that may be used from within other components.
 */
export const Image: React.FunctionComponent<ImageComponentConfig> = (props) => {

    const siteInfo = useContext(SiteContext);

    /*
     Note: We use the mounted state to conditionally add the 'lazyload' class in order to prevent a hydration
     mismatch error, which occurs if the 'lazyload' class is applied server-side and then lazysizes processes
     the image element client-side (resulting in 'lazyloaded' class to be added) before the React component
     has been hydrated.
     By only adding the 'lazyload' class after the component has been mounted, we guarantee that the first render
     won't trigger lazysizes to apply any load behavior. The downside of this approach is that lazysizes cannot
     load images until the component has been mounted (e.g. hydrated).
    */
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    let images = props.images || [];

    if (!images?.length) {
        return null;
    }

    const lazyLoad = props.lazyLoad !== false;
    const altText = props.altText || '';
    const imageInfos: any[] = [];
    const uniqueRatioBoxClass = `ys-ratio-box-${props.uniqueRatioBoxClass || hashCode(JSON.stringify(props.images))}`;
    const ratioBoxStyles: string[] = [];
    const breakpoints: MediaBreakpoints = siteInfo.breakpoints;
    const imageInfoByScreenMap: {[key: string]: any} = {
        xs: null,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        xxl: null
    };

    images.forEach((imageAssetConfig, index) => {
        const info = getImageInfo(imageAssetConfig);
        const fullInfo = {
            ...info,
            id: index+1,
            screenSizes: imageAssetConfig.screens
        };
        imageInfos.push(fullInfo);

        if (fullInfo.screenSizes?.length) {
            fullInfo.screenSizes.forEach((screen: string) => {
                imageInfoByScreenMap[screen] = fullInfo;
            });
        }
    });

    const renderRatioBox = props.ratioBox !== false && !imageInfos.find(info => !info.aspectRatio); // require all images to have aspect ratio
    let content;

    if (imageInfos.length === 1) {
        // Render a single <img> tag
        if (renderRatioBox) {
            ratioBoxStyles.push(`.${uniqueRatioBoxClass} { padding-bottom: ${imageInfos[0].aspectRatio}% }`);
        }
        content = <img alt={altText} {...imageInfos[0].imgElAttrs} />;
    } else {
        // Render a <picture> tag with <source> elements for the various screen sizes, and a fallback/default <img> tag
        const pictureSources: React.ReactElement[] = [];
        let lastImageInfo: any;

        for (const screenSize in imageInfoByScreenMap) {
            const imageInfo = imageInfoByScreenMap[screenSize];
            if (!imageInfo) {
                continue;
            }
            imageInfo.imgElAttrs.key = screenSize;
            if (!lastImageInfo) {
                pictureSources.push(<img alt={altText} {...imageInfo.imgElAttrs} />);
                ratioBoxStyles.push(`.${uniqueRatioBoxClass} { padding-bottom: ${imageInfo.aspectRatio}% }`);
            } else {
                if (imageInfo.id !== lastImageInfo.id) {
                    const media = `(min-width: ${(breakpoints as any)[screenSize]}px)`;
                    pictureSources.unshift(<source media={media} {...imageInfo.imgElAttrs} />);
                    if (renderRatioBox) {
                        ratioBoxStyles.push(`@media ${media} { .${uniqueRatioBoxClass} { padding-bottom: ${imageInfo.aspectRatio}% } }`);
                    }
                }
            }

            lastImageInfo = imageInfo;
        }

        content = (
            <picture>
                {pictureSources}
            </picture>
        );
    }

    function wrap(children: any) {
        return (
            <>
                <style>{ratioBoxStyles.join('')}</style>
                <div className={`ro-ratio-box ${uniqueRatioBoxClass}`}>
                    {children}
                </div>
            </>
        );
    }

    const className = CssClassBuilder.with(props.className, 'ro-image-wrapper');

    return (
        <div className={className} style={props.style} {...props.elementAttributes}>
            <ConditionalWrapper condition={renderRatioBox} wrapper={wrap}>
                {content}
            </ConditionalWrapper>
        </div>
    );

    function getImageInfo(config: ImageAssetConfig) {
        const src = getSrc(config);
        const width = config.width;
        const height = config.height;
        let aspectRatio = config.aspectRatio;
        let srcset = config.srcset;

        if (!srcset && src && siteInfo?.cdnDomain && siteInfo?.imageSizes?.length && src.startsWith(siteInfo.cdnDomain)) {
            const srcsetEntries = [];
            let largestImageSize = 0;
            for (const imageSize of siteInfo.imageSizes) {
                if (imageSize.width && (!width || imageSize.width < width)) {
                    const entry = src.replace('/original/', `/${imageSize.ukey}/`) + ` ${imageSize.width}w`;
                    srcsetEntries.push(entry);
                    if (imageSize.width > largestImageSize) {
                        largestImageSize = imageSize.width;
                    }
                }
            }
            if (width && width > largestImageSize) {
                srcsetEntries.push(`${src} ${width}w`);
            }
            if (srcsetEntries.length) {
                srcset = srcsetEntries.join(', ');
            }
        }

        const imgElAttrs: any = {
            className: new CssClassBuilder()
                .add('ro-image', props.className)
                .addIf(props.responsive, 'img-fluid')
                // only add 'lazyload' class after component was mounted to prevent hydration mismatch errors
                .addIf(lazyLoad && mounted, 'lazyload')
                .toString()
        };

        if (config.altText) {
            imgElAttrs['alt'] = config.altText;
        }

        if (lazyLoad) {
            imgElAttrs['data-src'] = src;
            imgElAttrs['data-srcset'] = srcset;
            imgElAttrs['data-sizes'] = config.sizes || 'auto';
        } else {
            imgElAttrs.src = src;
            imgElAttrs.srcSet = srcset;
            imgElAttrs.sizes = config.sizes;
        }

        if (!props.responsive) {
            imgElAttrs.width = width;
            imgElAttrs.height = height;
        }

        if (!aspectRatio && width && height) {
            aspectRatio = Math.round((height / width * 100) * 100.0) / 100.0; // round to 2 decimal places
        }

        return {
            imgElAttrs: imgElAttrs,
            aspectRatio: aspectRatio
        }
    }

    function getSrc(config: ImageAssetConfig) {
        let src = config.url;

        if (!src || src.startsWith('http') || src.startsWith('//')) {
            return src;
        }

        if (src.startsWith('/')) {
            // Assume that src is the full path
            return `${siteInfo!.cdnDomain}${src}`;
        }

        // Assume that src is the filename
        let mediaPath = siteInfo!.cdnMediaPath;
        if (!mediaPath.startsWith('/')) {
            mediaPath = `/${mediaPath}`;
        }
        return `${siteInfo!.cdnDomain}${mediaPath}/${siteInfo!.id}/images/original/${src}`;
    }

}