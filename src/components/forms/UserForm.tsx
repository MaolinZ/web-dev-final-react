import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, login, logout } from "../services/auth-services";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { getUserById } from "../services/user-services";

export default function UserForm(props: { submitMethod: string }) {
    const nav = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login({ email, password })
            .then(() => {
                nav("/");
            })
            .catch((err) => {
                console.log(err);
                setErrorFlag(true);
                setErrorMessage("Incorrect Credentials!")
            });
    }

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== "" && confirmPassword !== "" && password === confirmPassword) {
            createUser({ email, password })
                .then(() => {
                    nav("/profile");
                })
                .catch(err => {
                    setErrorFlag(true);
                    if (err.code === "auth/email-already-in-use") {
                        setErrorMessage("Email already in use!")
                    }
                    else if (err.code === "auth/weak-password") {
                        setErrorMessage("Password needs to be at least 6 characters!")
                    }
                    else {
                        console.log(err)
                    }
                });
        } else {
            setErrorFlag(true);
            setErrorMessage("Password and Confirm Password do not match!");
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user !== null) {

            }
        })
    }, []);

    return (
        <div className={'text-gray-500'}>
            <div>
                <h1 className="text-white pb-5 text-2xl">{props.submitMethod === 'login' ? "Login now!" : "Sign up now!"}</h1>
            </div>
            <div className="flex justify-center">
                <form className="bg-spotify-dark p-5" onSubmit={props.submitMethod === 'login' ? handleLogin : handleCreateUser}>
                    <div>
                        <label className="font-bold" htmlFor="email">Email</label>
                    </div>
                    <div className="pb-2">
                        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="font-bold" htmlFor="password">Password</label>
                    </div>
                    <div className="pb-2">
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {props.submitMethod !== 'login' ?
                        <div>
                            <div>
                                <label className="font-bold" htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            <div>
                                <input id="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div> : <></>
                    }
                    <div>
                        <button className="text-white font-bold my-4 py-1 px-4 bg-spotify-green rounded-lg" type="submit">Submit</button>
                    </div>
                </form>
                <div className={errorFlag ? "text-red-500" : "hidden"}>
                    <span>{errorMessage}</span>
                </div>
            </div>
        </div>
    );
}