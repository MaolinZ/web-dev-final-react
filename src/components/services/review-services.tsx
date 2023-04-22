import axios from "axios"
import { API_BASE } from "./api_consts";
import { ReviewProps } from "../props/ReviewProps";

const REVIEW_API = `${API_BASE}/reviews`

export const addReview = async (review: ReviewProps) => {
    const response = await axios.post(`${REVIEW_API}/add`, {review});
    return response.data;
}

export const getAllReviews = async () => {
    const response = await axios.get(`${REVIEW_API}`);
    return response.data;
}

export const updateReview = async (id: string, review: ReviewProps) => {
    const response = await axios.post(`${REVIEW_API}/update`, {id, review})
    return response.data;
}

export const getReviewById = async (id: string) => {
    const response = await axios.get(`${REVIEW_API}/${id}`);
    return response.data;
}

export const getReviewsBySong = async (uri: string) => {
    const response = await axios.get(`${REVIEW_API}/all/${uri}`)
    return response.data
}