import { Link } from "react-router";

function LoginFormHeader() {
    return (
        <div>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-primary">
                ← Back to home
            </Link>
            <h1 className="mt-4 text-2xl font-bold">Sign in to your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
    )
}

export default LoginFormHeader;