import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { addReview } from "../services/review-services";
import { auth } from "../config/firebase";
import { updateSongmetrics } from "../services/songmetrics-services";
import { useNavigate } from "react-router";

export default function ReviewForm(props: {songUri: string}) {
    const nav = useNavigate();
    const [description, setDescription] = useState<string>('');
    const [liked, setLiked] = useState<boolean>(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (auth.currentUser) {
            const response = await addReview({
                "description": description,
                "song_uri": props.songUri,
                "uid": auth.currentUser.uid,
                "liked": liked
            })
            await updateSongmetrics(props.songUri!, {reviews: [response]});
            nav(0);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
        });
    }, []);

    return (
        <div className={'text-gray-500'}>
            <form onSubmit={onSubmit}>
                <label>Review</label>
                <textarea onChange={(e) => { setDescription(e.target.value) }} />
                <label>Like</label>
                <input type="checkbox" onChange={(e) => { setLiked(!liked) }} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}