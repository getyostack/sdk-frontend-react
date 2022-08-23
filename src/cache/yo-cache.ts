import {isClient} from "../utils/context-utils";
import {hashCode, isObject, isPrimitive, orderObjectByKeys} from "../utils/common-utils";

export class YoCache {

    private store: {[key: string]: CacheEntry} = {};

    constructor() {
        if (isClient()) {
            window.setInterval(() => this.clearExpired, 30000);
        }
    }

    get(key: string) {
        const entry = this.store[key];
        if (!entry) {
            return undefined;
        }
        if (entry.expiry && entry.expiry <= Date.now()) {
            this.clear(key);
            return undefined;
        }
        return entry.value;
    }

    set(key: string, value: any, ttlMs?: number) {
        if (!key) {
            throw new Error('Missing required argument "key"');
        }
        this.store[key] = {
            value: value,
            expiry: ttlMs ? (Date.now() + ttlMs) : undefined
        };
    }

    clear(key: string) {
        if (key) {
            delete this.store[key];
        }
    }

    clearAll() {
        this.store = {};
    }

    createCacheKey(cacheKeySources: any[]): string|null {
        if (!cacheKeySources?.length) {
            return null;
        }

        const keys: string[] = [];

        const _addCacheKeySources = (sources: any[]) => {
            for (const source of sources) {
                if (!source) {
                    continue;
                }
                try {
                    if (isPrimitive(source)) {
                        keys.push(source.toString());
                    } else if (Array.isArray(source)) {
                        _addCacheKeySources(source);
                    } else if (isObject(source)) {
                        keys.push(JSON.stringify(orderObjectByKeys(source)));
                    } else {
                        keys.push(source.toString());
                    }
                } catch (err) {
                    console.error('Could not convert given value to a string for cache key usage:', source);
                }
            }
        };
        _addCacheKeySources(cacheKeySources);

        if (!keys.length) {
            return null;
        }

        return 'ys' + hashCode(keys.sort().join('-'));
    }

    private clearExpired() {
        const now = Date.now();
        for (const [key, entry] of Object.entries(this.store)) {
            if (entry.expiry && entry.expiry <= now) {
                this.clear(key);
            }
        }
    }

}

interface CacheEntry {
    expiry?: number;
    value: any;
}