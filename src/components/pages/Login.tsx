import UserForm from "../forms/UserForm";

export default function Login() {

    return (
        <div>
            <UserForm submitMethod="login" />
        </div>
    );
}