import {Link} from "react-router";

function RegisterFormFooter() {
    return (
        <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-primary hover:underline">
                Sign in
            </Link>
        </div>
    );
}

export default RegisterFormFooter;