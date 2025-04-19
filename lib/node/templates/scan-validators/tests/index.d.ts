export declare const testStatusFailed = "failed";
export declare const testStatusPassed = "passed";
export declare const defaultValidatorId = "zbar";
export declare const validators: {
    id: string;
    name: string;
}[];
export declare const testCases: {
    id: string;
    name: string;
}[];
export interface TestCase {
    name: string;
    expect: {
        isValid: boolean;
        isInverted?: boolean;
    };
    options: any;
}
export declare const invertCases: (cases: TestCase[], isValid?: boolean, isInverted?: boolean) => {
    expect: {
        isValid: boolean;
        isInverted: boolean | undefined;
    };
    options: any;
    name: string;
}[];
