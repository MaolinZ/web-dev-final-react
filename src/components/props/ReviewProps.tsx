import { DocumentReference } from "firebase/firestore";

export interface ReviewProps {
    song_uri?: string,
    description?: string,
    liked?: boolean,
    user?: DocumentReference,
}