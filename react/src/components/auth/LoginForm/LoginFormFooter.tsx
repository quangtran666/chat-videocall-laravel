import { Link } from "react-router";

function LoginFormFooter() {
    return (
        <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="font-medium text-primary hover:underline">
                Create one
            </Link>
        </div>
    )
}

export default LoginFormFooter;