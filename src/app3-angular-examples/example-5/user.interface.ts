export interface User {
    name: string;
    address: {
        street?: string; // required
        postalcode?: string;
    }
}
