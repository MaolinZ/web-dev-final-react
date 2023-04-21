import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router";
import { getProfileImageURL, getUserById, updateUser, uploadProfileImage } from "../services/user-services";
import { UserProps } from "../props/UserProps";
import Topbar from "../topbar";

export default function Profile() {
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserProps>({});
    const [username, setUsername] = useState<string>("");
    const [biography, setBiography] = useState<string>("");
    const [profileImg, setProfileImg] = useState<File>();
    const [currProfileImg, setCurrProfileImg] = useState<string>();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (auth.currentUser !== null && profileImg) {
            await updateUser(auth.currentUser.uid, { username, biography });
            await uploadProfileImage(auth.currentUser.uid, profileImg);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user === null) {
                nav('/');
            } else {
                const response = await getUserById(user.uid);
                setCurrentUser(response);
                const img = await getProfileImageURL(user.uid);
                setCurrProfileImg(img);
            }
        });
    }, []);

    return (
        <div>
            <Topbar />
            <div className="h-full">
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <img src={currProfileImg} className="rounded-full object-contain"></img>
                        <label>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} defaultValue={currentUser?.username} />
                        <label>Biography</label>
                        <textarea onChange={(e) => setBiography(e.target.value)} />
                        <label>Upload Profile Pic!</label>
                        <input type="file" onChange={(e) => {
                            if (e.target.files) {
                                setProfileImg(e.target.files[0]);
                            }
                        }} />
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}