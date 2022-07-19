import {AudienceEvaluationContext} from "./audience-evaluation-context.interface";

export interface AudienceCriteriaInfo {
    id: string;
    evaluateFn: AudienceCriteriaEvaluatorFn;
    requiredContext?: string[];
}

export type AudienceCriteriaEvaluatorFn = (criteria: any, context: AudienceEvaluationContext) => boolean;