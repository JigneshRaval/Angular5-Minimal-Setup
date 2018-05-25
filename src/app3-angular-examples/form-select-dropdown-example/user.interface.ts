export interface User {
    language: string;
    name: string;
    address: {
        street?: string; // required
        postalcode?: string;
    }
}
