import { useEffect, useState } from "react";
import { ReviewProps } from "../../../../props/ReviewProps";
import { UserProps } from "../../../../props/UserProps";
import { getUserById } from "../../../../services/user-services";
import { Link } from "react-router-dom";

export default function Review(props: { review: ReviewProps }) {

    const {review} = props

    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInfo = async () => {
            setLoading(true);
            const user = await getUserById(review.uid!);
            setUsername(user.username);
            setLoading(false);
        }

        fetchInfo();
    }, []);

    return (
        <>
            {!loading ? 
            <div className="bg-white text-black">
                PLEASE
                <Link to={`/profile/${review.uid}`}>{username}</Link>
                <p>{review.description}</p>
            </div> : <></>}

        </>
    );
}