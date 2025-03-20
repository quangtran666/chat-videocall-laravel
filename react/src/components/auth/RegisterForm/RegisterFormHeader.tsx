import {Link} from "react-router";

function RegisterFormHeader() {
    return (
        <div>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-primary">
                ← Back to home
            </Link>
            <h1 className="mt-4 text-2xl font-bold">Create an account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Fill in the details below to create your account</p>
        </div>
    );
}

export default RegisterFormHeader;