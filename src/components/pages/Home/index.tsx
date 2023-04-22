import React, {useEffect, useState} from "react";
import Topbar from "../../topbar";
import {auth} from "../../config/firebase";
import {getUserById} from "../../services/user-services";
import {getAllReviews} from "../../services/review-services";
import {onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router";
import {ReviewProps} from "../../props/ReviewProps";
import Review from "../search-results/details/review/review";

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
            {auth.currentUser !== null &&
                <h1 className={'text-white text-4xl text-3xl'}>
                    {`Welcome ` + user.username}</h1>}
            {!loading &&
                reviews.map((review) => {
                    return (<div className={'text-white'}>
                        <Review  review={review}/>
                    </div>)
                })}
        </div>
    )

}