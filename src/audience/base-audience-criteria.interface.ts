export interface BaseAudienceCriteria {
    /** The unique criteria type name. */
    _type: string;

    /** Whether the evaluation result is negated. */
    _negate: boolean;
}