export const DEFAULT_IMAGE_SIZES: ImageSize[] = [
    { ukey: '100', width: 100 },
    { ukey: '200', width: 200 },
    { ukey: '300', width: 300 },
    { ukey: '500', width: 500 },
    { ukey: '750', width: 750 },
    { ukey: '1000', width: 1000 },
    { ukey: '1250', width: 1250 },
    { ukey: '1500', width: 1500 },
    { ukey: '1750', width: 1750 },
    { ukey: '2000', width: 2000 }
];

export interface ImageSize {
    ukey: string;
    width: number;
    height?: number;
}