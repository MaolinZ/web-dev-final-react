import { useEffect, useState } from "react";
import { SongmetricsProps } from "../../../../props/SongmetricsProps";
import Review from "./review";
import { getSongmetricsById } from "../../../../services/songmetrics-services";

export default function ReviewList(props: { songUri: string }) {
    const [reviews, setReviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(props.songUri);
        const fetchSongmetrics = async () => {
            setLoading(true);
            const response = await getSongmetricsById(props.songUri!);
            console.log(response.reviews);
            setReviews([...response.reviews].reverse());
            setLoading(false);
        }
        fetchSongmetrics();
    }, []);

    return (
        <div>
            {!loading ?
                <div>
                    {reviews.map((review) => {
                        return <li><Review reviewId={review}/></li>
                    })}
                </div> : <></>}
        </div>
    );
}