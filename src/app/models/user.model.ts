import { Language } from "./language.enum";
import { Role } from "./role.model";



export interface User {
    id: number;
    name: string;
    email: string;
    language: Language
    role: Role
    credentialNonExpired: boolean
    accountNonExpired: boolean
    firstName: string,
    lastName: string
    enabled: boolean
    userName: string,
    accountNonLocked: boolean
    credentialsNonExpired: boolean
}