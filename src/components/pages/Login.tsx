import UserForm from "../forms/UserForm";

export default function Login() {

    return (
        <div className="h-full">
            <UserForm submitMethod="login" />
        </div>
    );
}