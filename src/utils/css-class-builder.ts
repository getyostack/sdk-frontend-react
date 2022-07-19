export class CssClassBuilder {

    private cssClasses: Set<any> = new Set<any>();

    constructor(initialCssClasses?: any[]) {
        if (initialCssClasses?.length) {
            this.addAll(initialCssClasses);
        }
    }

    add(...classNames: any[]): CssClassBuilder {
        this.addAll(classNames);
        return this;
    }

    addAll(classNames: any[]): CssClassBuilder {
        if (!classNames?.length) {
            return this;
        }

        classNames = CssClassBuilder.flattenedClassNames(classNames);

        for (const className of classNames) {
            if (className) {
                const trimmedClassName = className.toString().trim();
                if (trimmedClassName && !this.cssClasses.has(trimmedClassName)) {
                    this.cssClasses.add(className);
                }
            }
        }

        return this;
    }

    addIf(expression: any, className?: any): CssClassBuilder {
        if (expression && className) {
            this.addAll([className]);
        }
        return this;
    }

    isEmpty(): boolean {
        return this.cssClasses.size === 0;
    }

    toString(): string {
        return this.toArray().join(' ');
    }

    toArray(): string[] {
        return Array.from(this.cssClasses.values());
    }

    /**
     * Flattens the given array of class names which may contain other arrays of class names.
     */
    static flattenedClassNames(classNames: any[]): string[] {
        let flattenedClassNames: string[] = [];
        for (const className of classNames) {
            if (!className) {
                continue;
            }
            if (Array.isArray(className)) {
                const cns = this.flattenedClassNames(className);
                flattenedClassNames = flattenedClassNames.concat(cns);
            } else if ('string' === typeof className) {
                flattenedClassNames.push(className);
            } else {
                console.warn('Encountered invalid object type for class name:', className);
            }
        }
        return flattenedClassNames;
    }

    static of(classNames: any[]): string {
        return new CssClassBuilder(classNames).toString();
    }

    static with(...classNames: any[]): string {
        return CssClassBuilder.of(classNames);
    }

}