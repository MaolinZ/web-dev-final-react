import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { addReview } from "../services/review-services";
import { doc } from "@firebase/firestore";
import { auth, db } from "../config/firebase";
import { UserProps } from "../props/UserProps";
import { getUserById } from "../services/user-services";

export default function ReviewForm(props: {songUri: string}) {
    const [description, setDescription] = useState<string>('');
    const [liked, setLiked] = useState<boolean>(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (auth.currentUser) {
            await addReview({
                "description": description,
                "song_uri": props.songUri,
                "user": doc(db, "users", auth.currentUser.uid),
                "liked": liked
            })
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
        });
    }, []);

    return (
        <form onSubmit={onSubmit}>
            <label>Review</label>
            <textarea onChange={(e) => { setDescription(e.target.value) }} />
            <label>Like</label>
            <input type="checkbox" onChange={(e) => { setLiked(!liked) }} />
            <button type="submit">Submit</button>
        </form>
    );
}