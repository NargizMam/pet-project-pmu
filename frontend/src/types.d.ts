export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    image: string | null;
}
export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    mobile: string;
}
export interface LoginMutation {
    email: string;
    password: string;

}
export interface RegisterResponse {
    message: string;
    user: User;
}
export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}
export interface GlobalError {
  error: string
}