export type StringOperator = 'exact' | 'eq' | 'ne' | 'contains' | 'notblank' | 'regex' | 'any';

export type NumberOperator = 'any' | 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte';

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