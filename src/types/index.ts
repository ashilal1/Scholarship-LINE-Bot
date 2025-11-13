export interface User {
    id: number;
    name: string;
    email: string;
}

export type ResponseData<T> = {
    success: boolean;
    data: T;
    message?: string;
};