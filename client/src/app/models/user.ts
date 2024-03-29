import { Basket } from "./basket";

export interface User {
    email: string;
    token: string;
    basket?: Basket;
    roles?: string[];
    name?: string;
    lastName?: string;
    phoneNumber?: string;
}