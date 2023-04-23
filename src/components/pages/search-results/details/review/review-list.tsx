import {useEffect, useState} from "react";
import {ReviewProps} from "../../../../props/ReviewProps";
import {getReviewsBySong} from "../../../../services/review-services";
import Review from "./review";

export default function ReviewList(props: { songUri: string }) {
    const [reviews, setReviews] = useState<ReviewProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSongmetrics = async () => {
            setLoading(true);
            const response = await getReviewsBySong(props.songUri);
            await setReviews(response)
            setLoading(false);
        }
        fetchSongmetrics();
    }, []);

    return (
        <div>
            {!loading ?
                <div className={'review-list m-auto w-full'}>
                    {reviews.map((r) => <Review review={r}/>)}
                </div>
                :
                <></>}
        </div>
    );
}