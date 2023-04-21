import UserForm from "../forms/UserForm";

export default function SignUp() {
    return (
        <div className="h-full">
            <UserForm submitMethod="signUp"/>
        </div>
    );
}