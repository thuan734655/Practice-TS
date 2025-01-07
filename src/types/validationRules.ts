export interface ValidationRule {
    validate: (value: any) => boolean; 
    message: string; 
}

export type ValidationRules = {
    [key: string]: ValidationRule[]; 
};
