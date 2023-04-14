import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserForm(props: { submitMethod: string }) {
    //const nav = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    return (
        <div>
            <div>
                <span>{props.submitMethod === 'login' ? "Login now!" : "Sign up now!"}</span>
            </div>
            <div>
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        <input id="email" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <input id="password" type="password" />
                    </div>
                    {props.submitMethod !== 'login' ?
                        <div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            <div>
                                <input id="confirmPassword" type="password" />
                            </div>
                        </div> : <></>
                    }
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}