export interface FirestoreQuerySetInterface {
    field: string;
    condition:'=='| '<' | '>' | '<=' | '>=' | '!=' | 'in' | 'not-in' | 'array-contains' | 'array-contains-any';
    value: string | number|number[]|string[];
}


