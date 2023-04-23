import {ReviewProps} from "../../../../props/ReviewProps";
import Review from "./review";



export default function ReviewList(props: { reviews: ReviewProps[] }) {
    return (
        <div>
                <div className={'review-list m-auto w-full'}>
                    {props.reviews.map((r, i) => <Review review={r} key={i}/>)}
                </div>
        </div>
    );
}