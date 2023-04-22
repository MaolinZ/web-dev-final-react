import { useEffect, useState } from "react";
import { ReviewProps } from "../../../../props/ReviewProps";
import { UserProps } from "../../../../props/UserProps";
import { getUserById } from "../../../../services/user-services";
import { Link } from "react-router-dom";
import { getReviewById } from "../../../../services/review-services";

export default function Review(props: { reviewId: string }) {
    //const [reviewer, setReviewer] = useState<UserProps>();
    const [description, setDescription] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [uid, setUid] = useState<string>("");
    //const [review, setReview] = useState<ReviewProps>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInfo = async () => {
            setLoading(true);
            const response = await getReviewById(props.reviewId);
            setDescription(response.description);
            setUid(response.uid);
            const user = await getUserById(response.uid);
            setUsername(user.username);
            setLoading(false);
        }

        fetchInfo();
        console.log(username);
    }, []);

    return (
        <>
            {!loading ? 
            <div className="bg-white text-black">
                <Link to={`/profile/${uid}`}>{username}</Link>
                <p>{description}</p>
            </div> : <></>}

        </>
    );
}