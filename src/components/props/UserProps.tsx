import { DocumentReference } from "firebase/firestore";

export interface UserProps {
    uid?: string
    username?: string;
    followers?: Array<DocumentReference>;
    songs?: Array<string>;
    biography?: string;
}

export const UserTemplate = {
    "username": "",
    "followers": [],
    "songs": [],
    "biography": "",
}