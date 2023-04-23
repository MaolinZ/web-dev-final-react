import {ReviewProps} from "../../../../props/ReviewProps";
import Review from "./review";



export default function ReviewList(props: { reviews: ReviewProps[], isAdmin?: boolean }) {

    const {reviews, isAdmin} = props

    return (
        <div>
                <div className={'review-list m-auto w-full'}>
                    {reviews.map((r, i) => <Review review={r} key={i} isAdmin={isAdmin}/>)}
                </div>
        </div>
    );
}