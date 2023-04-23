import React, {useEffect, useState} from "react";
import Topbar from "../../topbar";
import {auth} from "../../config/firebase";
import {getUserById} from "../../services/user-services";
import {getAllReviews} from "../../services/review-services";
import {onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router";
import {ReviewProps} from "../../props/ReviewProps";
import ReviewList from "../search-results/details/review/review-list";

export default function Home() {
    const nav = useNavigate();
    const [user, setUser] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState<ReviewProps[]>([])

    useEffect(() => {

        const fetchReviews = async () => {
            setLoading(true)
            const response: ReviewProps[] = await getAllReviews()

            // TODO Filter by most recent
            setReviews(response.slice(0, 10))
            setLoading(false)
        }

        fetchReviews()
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const response = await getUserById(auth.currentUser?.uid!)
            setUser(response);
        })
    }, [])

    return (
        <div>
            <Topbar></Topbar>
            <div className={'md:mx-8 lg:w-8/12 lg:m-auto'}>
                {auth.currentUser !== null &&
                    <h1 className={`text-white lg:text-5xl text-3xl font-bold mt-4 w-fit text-left`}>
                        {`Welcome ` + user.username + '!'}</h1>}
                <h1 className={`text-3xl text-white w-fit mr-auto my-4 md:ml-0 ml-4`}>Recent Reviews</h1>
                <div className={'m-auto'}>
                    {!loading &&
                        <ReviewList reviews={reviews}/>}
                </div>
            </div>
        </div>
    )

}