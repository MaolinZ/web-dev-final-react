import { DocumentReference } from "firebase/firestore";

export interface UserProps {
    uid?: string
    username?: string;
    followers?: Array<string>;
    songs?: Array<string>;
    biography?: string;
    isAdmin?: boolean;
    isBanned?: boolean;
}

export const UserTemplate = {
    "username": "",
    "followers": [],
    "songs": [],
    "biography": "",
    "isAdmin": false,
    "isBanned": false,
}