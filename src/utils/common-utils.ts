import {NumberOperator, StringOperator} from "./operators";

export function isObject(o: any) {
    return o !== null && 'object' === typeof o;
}

export function isNumber(num: any) {
    return num !== null && num !== undefined && !isNaN(num) && 'number' === typeof num;
}

export function isDate(date: any) {
    return date && date instanceof Date;
}

export function isPrimitive(val: any) {
    return val !== Object(val);
}

export function equalsIgnoreCase(str1: string | null | undefined, str2: string | null | undefined) {
    return (!str1 || !str2) ? str1 === str2 : str1.toLowerCase() === str2.toLowerCase();
}

export function isStringMatch(actualValue: string|null|undefined, expectedValue: string|null|undefined, matchType: StringOperator): boolean {
    if (actualValue && 'string' !== typeof actualValue) {
        actualValue = actualValue+'';
    }
    if (expectedValue && 'string' !== typeof expectedValue) {
        expectedValue = expectedValue+'';
    }
    switch (matchType.toLowerCase()) {
        case "any":
            return true;
        case "exact":
        case "eq":
            return equalsIgnoreCase(actualValue, expectedValue);
        case "contains":
            return !!actualValue && !!expectedValue && actualValue.includes(expectedValue);
        case "notblank":
            return !!actualValue;
        case "regex":
            return !!(actualValue && expectedValue && new RegExp(expectedValue).test(actualValue));
        case "ne":
            return !equalsIgnoreCase(actualValue, expectedValue);
        default:
            return false;
    }
}

export function isNumberMatch(actualValue: number|null|undefined, compareToValue: number|null|undefined, operator: NumberOperator): boolean {
    switch (operator.toLowerCase()) {
        case "any":
            return true;
        case "eq":
            return Number(actualValue) === Number(compareToValue);
        case "ne":
            return Number(actualValue) !== Number(compareToValue);
        case "gt":
            return Number(actualValue) > Number(compareToValue);
        case "gte":
            return Number(actualValue) >= Number(compareToValue);
        case "lt":
            return Number(actualValue) < Number(compareToValue);
        case "lte":
            return Number(actualValue) <= Number(compareToValue);
        default:
            return false;
    }
}

export function hashCode(str: string): number {
    let hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function isExternalLink(href: string, target?: string|null) {
    if (!href) {
        return false;
    }
    return href.startsWith('http')
        || href.startsWith('//')
        || href.startsWith('mailto:')
        || href.startsWith('tel:')
        || '_blank' === target;
}

export function isAnchorLink(href: string) {
    return href?.startsWith('#');
}

/**
 * Returns the value at the given path from the given object. The path can contain dot-syntax to
 * reference nested values.
 *
 * For example, a path of "product.title" for an object of { product: { title: 'Test' } } will return
 * the value "Test".
 *
 * @param path The path to the value to be returned. Can include dot-syntax for nested values.
 * @param obj The object containing the value.
 */
export function getByPath(path: string|null|undefined, obj: any): any {
    if (!path) {
        return obj;
    }
    try {
        return path.split('.').reduce((o, i) => o[i], obj);
    } catch(err) {
        console.error(`Could not get value by path: "${path}"`, obj, err);
        return null;
    }
}

export function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!src) {
            return reject('No script src provided');
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = () => resolve();
        script.onerror = () => reject(`Could not load script: ${src}`);
        script.src = src;
        document.getElementsByTagName('head')[0].appendChild(script);
    });
}

export function getUrlQueryParameter(name: string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export function arrayContains(a: any[], b: any[]) {
    if (!a?.length || !b?.length) {
        return false;
    }
    let match = false;
    for (const v of a) {
        if (b.includes(v)) {
            match = true;
            break;
        }
    }
    return match;
}

export function orderObjectByKeys(unordered: any) {
    return Object.keys(unordered).sort().reduce((obj: any, key: string) => {
        obj[key] = unordered[key];
        return obj;
    }, {});
}