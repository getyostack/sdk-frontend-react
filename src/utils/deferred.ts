export class Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason?: any) => void;

    constructor() {
        let resolve: (value: T) => void;
        let reject: (reason?: any) => void;
        this.promise = new Promise<T>((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });
        this.resolve = resolve!;
        this.reject = reject!;
    }

}