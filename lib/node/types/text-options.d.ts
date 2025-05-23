export interface TextOptions {
    value?: string | null;
    topValue?: string | null;
    leftValue?: string | null;
    rightValue?: string | null;
    bottomValue?: string | null;
}
export interface QRTextTemplateDefinition {
    id: string;
    name: string;
    options: TextOptions;
}
