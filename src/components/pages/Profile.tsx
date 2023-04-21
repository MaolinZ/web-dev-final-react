import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router";
import { getUserById, updateUser } from "../services/user-services";
import { UserProps } from "../props/UserProps";

export default function Profile() {
    const nav = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserProps>({});
    const [username, setUsername] = useState<string>("");
    const [biography, setBiography] = useState<string>("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (auth.currentUser !== null) { 
            await updateUser(auth.currentUser.uid, {username, biography});
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user === null) {
                nav('/');
            } else {
                const response = await getUserById(user.uid);
                setCurrentUser(response);
            }
        });
    }, []);
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Username</label>
                <input onChange={(e) => setUsername(e.target.value)} defaultValue={currentUser?.username}/>
                <label>Biography</label>
                <textarea onChange={(e) => setBiography(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}