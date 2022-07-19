export interface AudienceEvaluationContext {
    user?: any;
    cart?: any;
    customEventData?: { [key: string]: string };
    [key: string]: any;
}