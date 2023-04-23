import {onAuthStateChanged} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {auth} from "../config/firebase";
import {useNavigate, useParams} from "react-router";
import {
    banUser,
    getProfileImageURL,
    getUserById,
    unbanUser,
    updateUser,
    uploadProfileImage
} from "../services/user-services";
import {UserProps} from "../props/UserProps";
import Topbar from "../topbar";
import {BiEdit} from 'react-icons/bi'
import {IconContext} from "react-icons";
import {changeUserEmail, changeUserPassword} from "../services/auth-services";
import {getReviewByUid, updateReviewByUid} from "../services/review-services";
import {ReviewProps} from "../props/ReviewProps";
import ReviewList from "./search-results/details/review/review-list";


// TODO Add check for invalid uid route parameter
export default function Profile() {
    const [editing, setEditing] = useState(false)
    const [currentUser, setCurrentUser] = useState<UserProps>({});
    const [profileImg, setProfileImg] = useState<File>();
    const [currProfileImg, setCurrProfileImg] = useState<string>('https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png');
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const [reviews, setReviews] = useState<ReviewProps[]>([])
    const [loading, setLoading] = useState(true)

    const {uid} = useParams()
    const navigate = useNavigate()

    const isUser = () => {
        return uid == auth.currentUser?.uid
    }

    const banThisUser = async () => {
        await banUser(uid!);
        navigate(0);
    }
    const unbanThisUser = async () => {
        await unbanUser(uid!);
        navigate(0);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submit")
        if (auth.currentUser !== null && (isUser() || isAdmin)) {
            const username = (document.getElementById('user-form') as HTMLInputElement).value
            const biography = (document.getElementById('bio-form') as HTMLInputElement).value
            try {
                await updateUser(uid!, {username, biography});
                await updateReviewByUid(uid!, {username: username});
            } catch {
                setErrorFlag(true);
                setErrorMessage("Username already exists!")
                return;
            }
            if (profileImg) {
                await uploadProfileImage(uid!, profileImg)
            }
            try {
                if (email && email !== "") {
                    await changeUserEmail(email);
                }
                if (password && password !== "") {
                    await changeUserPassword(password);
                }
            } catch {
                setErrorFlag(true);
                setErrorMessage("This is sensitive info you are changing. Please log out and log in again to change.");
                return;
            }
            navigate(0)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const response = await getUserById(uid!);
            setCurrentUser(response);
            const img = await getProfileImageURL(uid!);
            setCurrProfileImg(img);
            const lookingUser = await getUserById(user?.uid!);
            setIsAdmin(lookingUser.isAdmin);
        });
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await getReviewByUid(uid!)
            await setReviews(response)
            setLoading(false)
        }
        setLoading(true)
        fetchReviews()
    }, [])

    function test() {
        console.log(reviews)
        return(
            <div>test</div>
        )
    }

    return (
        <div>
            <Topbar/>
            <div
                className="h-full text-gray-500 bg-spotify-gray m-auto pt-10 pb-20 w-12/12 lg:w-9/12 2xl:w-8/12">
                <div>
                    {!isUser() && isAdmin && !currentUser.isAdmin ?
                        <div>
                            {!currentUser.isBanned ?
                                <button
                                    className="text-white font-bold my-4 py-1 px-4 bg-spotify-green rounded-lg"
                                    onClick={banThisUser}>BAN</button>
                                : <button
                                    className="text-white font-bold my-4 py-1 px-4 bg-spotify-green rounded-lg"
                                    onClick={unbanThisUser}>UNBAN</button>
                            }
                        </div> : <></>
                    }
                </div>
                <form onSubmit={onSubmit}>
                    <div className={'md:mx-20'}>
                        <div className={'md:flex items-center'}>
                            <img src={currProfileImg}
                                 className="rounded-full border-8 border-spotify-dark bg-white object-contain w-56 h-56 md:ml-4 md:mr-12 inline-block"/>
                            <div className={'flex flex-col'}>
                                <h1 className={`text-gray-500 w-fit m-auto md:m-0`}>
                                    <label
                                        className={`${isUser() || (isAdmin && !currentUser.isAdmin)  ? 'hover:cursor-pointer' : ''}`}
                                        htmlFor={'edit-toggle'}>Profile</label>
                                    {(isUser() || (isAdmin && !currentUser.isAdmin) ) && <button
                                        id={'edit-toggle'}
                                        className={`m-auto md:inline md:ml-1`}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            if (isUser() || (isAdmin && !currentUser.isAdmin) ) {
                                                setEditing(!editing)
                                            }
                                        }}
                                    >
                                        <IconContext.Provider
                                            value={{size: '16px'}}>
                                            <BiEdit/>
                                        </IconContext.Provider>
                                    </button>}
                                </h1>
                                <input
                                    autoComplete={"off"}
                                    className={`text-4xl md:text-5xl text-white py-4 font-extrabold w-10/12
                                    m-auto ml-10 md:ml-0 md:float-left truncate ${editing ? 'bg-green-700' : 'bg-transparent'}`}
                                    id={"user-form"}
                                    defaultValue={currentUser?.username}
                                    readOnly={!editing}/>
                            </div>
                        </div>
                        <div
                            className={`bg-spotify-dark items-start p-10 pt-36 md:pt-24 -mt-36 md:-mt-10`}>
                            <div>
                                <label className={`text-white mr-auto text-md md:text-xl 
                            font-bold flex mb-4`}>About</label>
                                <textarea
                                    className={`md:text-base text-sm block resize-none w-full h-52 ${editing ? 'text-black' : 'bg-transparent focus:outline-none'}`}
                                    id={'bio-form'}
                                    defaultValue={currentUser?.biography}
                                    readOnly={!editing}/>
                            </div>
                            <div className={`my-4`}>
                                {(isUser() || (isAdmin && !currentUser.isAdmin) ) && editing && <>
                                    <div>
                                        <label className={'text-white'}>Change
                                            Avatar: </label>
                                        <input type="file" onChange={(e) => {
                                            if (e.target.files) {
                                                setProfileImg(e.target.files[0]);
                                            }
                                        }}/>
                                    </div>
                                </>}

                                {isUser() && editing && <>
                                    <div className="text-left mb-3">
                                        <label className="text-white">Change
                                            Email: </label>
                                        <input className="p-1" required={false}
                                               onChange={(e) => {
                                                   setEmail(e.target.value);
                                               }}/>
                                    </div>
                                    <div className="text-left">
                                        <label className="text-white">Change
                                            Password: </label>
                                        <input className="p-1" required={false}
                                               type="password"
                                               onChange={(e) => {
                                                   setPassword(e.target.value);
                                               }}/>
                                    </div>
                                </>}

                                {(isUser() || (isAdmin && !currentUser.isAdmin) ) && editing && <>
                                    {editing &&
                                        <>
                                            <div
                                                className={!errorFlag ? "hidden" : ""}>
                                                <p className="text-red-500">{errorMessage}</p>
                                            </div>
                                            <button
                                                className={`text-white font-bold my-4 py-1 px-4 bg-spotify-green rounded-lg`}
                                                type="submit">Submit
                                            </button>
                                        </>}
                                </>}
                            </div>
                        </div>
                    </div>
                </form>
                {!loading &&
                    <div>
                        <h1
                            className={`text-white font-medium text-4xl mb-10
                                mt-20 pb-5 m-auto w-fit px-20`}
                            style={{
                                borderBottom: 'gray 1px' +
                                    ' solid'
                            }}>
                            REVIEWS</h1>
                        <div className={'w-full md:w-8/12 2xl:w-6/12' +
                            '  m-auto'}>
                            <ReviewList reviews={reviews}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}