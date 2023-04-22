import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import {auth} from "../config/firebase";
import {useNavigate, useParams} from "react-router";
import {
    getProfileImageURL,
    getUserById,
    updateUser,
    uploadProfileImage
} from "../services/user-services";
import {UserProps} from "../props/UserProps";
import Topbar from "../topbar";
<<<<<<< Updated upstream
=======
import {BiEdit} from 'react-icons/bi'
import {IconContext} from "react-icons";
import { changeUserEmail } from "../services/auth-services";
>>>>>>> Stashed changes


// TODO Add check for invalid uid route parameter
export default function Profile() {
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserProps>({});
    const [profileImg, setProfileImg] = useState<File>();
<<<<<<< Updated upstream
    const [currProfileImg, setCurrProfileImg] = useState<string>();
=======
    const [currProfileImg, setCurrProfileImg] = useState<string>('https://www.digitary.net/wp-content/uploads/2021/07/Generic-Profile-Image.png');
    const [email, setEmail] = useState<string>("");
>>>>>>> Stashed changes

    const {uid} = useParams()
    const navigate = useNavigate()

    const isUser = () => {
        return uid == auth.currentUser?.uid
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (auth.currentUser !== null && isUser()) {
            const username = (document.getElementById('user-form') as HTMLInputElement).value
            const biography = (document.getElementById('bio-form') as HTMLInputElement).value
            await updateUser(auth.currentUser.uid, {username, biography});
            if (profileImg) {
                await uploadProfileImage(auth.currentUser.uid, profileImg)
            }
            if (email && email !== "") {
                await changeUserEmail(email);
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
        });
    }, []);

    return (
        <div>
            <Topbar/>
            <div className="h-full text-gray-500 bg-spotify-gray m-auto w-8/12">
                <form onSubmit={onSubmit}>
<<<<<<< Updated upstream
                    <div className="flex flex-col items-center justify-center">
                        <img src={currProfileImg}
                             className="rounded-full object-contain w-56 h-56"></img>
                        <label>Username</label>
                        <input id={"user-form"}
                               defaultValue={currentUser?.username}
                               readOnly={!isUser()}/>
                        <label>Biography</label>
                        <textarea id={'bio-form'}
                                  defaultValue={currentUser?.biography}
                                  readOnly={!isUser()}/>
                        {isUser() && <>
                            <label>Upload Profile Pic!</label>
                            <input type="file" onChange={(e) => {
                                if (e.target.files) {
                                    setProfileImg(e.target.files[0]);
                                }
                            }}/>
                            <button type="submit">Submit</button>
                        </>}
=======
                    <div className={'md:mx-20'}>
                        <div className={'md:flex items-center'}>
                            <img src={currProfileImg}
                                 className="rounded-full border-8 border-spotify-dark bg-white object-contain w-56 h-56 md:ml-4 md:mr-12 inline-block"/>
                            <div className={'flex flex-col'}>
                                <h1 className={`text-gray-500 w-fit m-auto md:m-0`}>
                                    <label
                                        className={`${isUser() ? 'hover:cursor-pointer' : ''}`}
                                        htmlFor={'edit-toggle'}>Profile</label>
                                    {isUser() && <button
                                        id={'edit-toggle'}
                                        className={`m-auto md:inline md:ml-1`}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            if (isUser()) {
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
                                {isUser() && editing && <>
                                    <div>
                                        <label className={'text-white'}>Change
                                            Avatar: </label>
                                        <input type="file" onChange={(e) => {
                                            if (e.target.files) {
                                                setProfileImg(e.target.files[0]);
                                            }
                                        }}/>
                                        <label className="text-white">Change Email</label>
                                        <input onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}/>
                                    </div>
                                    {editing &&
                                        <button
                                            className={`text-white font-bold my-4 py-1 px-4 bg-spotify-green rounded-lg`}
                                            type="submit">Submit</button>}
                                </>}
                            </div>
                        </div>
>>>>>>> Stashed changes
                    </div>
                </form>
            </div>
        </div>
    );
}