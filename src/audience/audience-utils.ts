import {BaseAudienceCriteria} from "./base-audience-criteria.interface";

export function negateIfNecessary(nonNegatedEvaluationResult: boolean, criteria: BaseAudienceCriteria) {
    if (criteria._negate) {
        return !nonNegatedEvaluationResult;
    }
    return nonNegatedEvaluationResult;
}