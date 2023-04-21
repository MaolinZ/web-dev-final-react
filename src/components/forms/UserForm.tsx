import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authState, createUser, login } from "../services/auth-services";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function UserForm(props: { submitMethod: string }) {
    //const nav = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorFlag, setErrorFlag] = useState<boolean>(false);

    const [testElem, setTestElem] = useState<string>("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login({ email, password })
            .then()
            .catch(err => console.log(err));
    }

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== "" && confirmPassword !== "" && password === confirmPassword) {
            createUser({ email, password })
                .then(() => {
                })
                .catch(err => {
                    console.log(err.code);
                    if (err.code === "auth/email-already-in-use") {
                        setErrorFlag(true);
                    }
                    else {
                        console.log(err)
                    }
                });
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                console.log(user.uid);
                setTestElem(user.uid);
            }
        })
    });

    return (
        <div>
            <div>
                <span>{props.submitMethod === 'login' ? "Login now!" : "Sign up now!"}</span>
            </div>
            <div>
                <form onSubmit={props.submitMethod === 'login' ? handleLogin : handleCreateUser}>
                    <div>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {props.submitMethod !== 'login' ?
                        <div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            <div>
                                <input id="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div> : <></>
                    }
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div className={errorFlag ? "" : "hidden"}>
                    <span>Email already in use!</span>
                </div>
                <div className="text-red-700">
                    <h1>{testElem}</h1>
                </div>
            </div>
        </div>
    );
}