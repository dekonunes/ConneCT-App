export interface UserCredentials {
    email: string;
    password: string;
}

export interface IUser {
    uid: string;
    username: string;
}

export interface ValidationResult {
    [key: string]: boolean;
}
