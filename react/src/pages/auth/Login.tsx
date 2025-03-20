import LoginForm from "@/components/auth/LoginForm/LoginForm.tsx";

function Login() {
    return (
        <>
            <div className="flex min-h-screen bg-gradient-to-b from-background to-muted">
                <div className="flex flex-col justify-center w-full px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24 ">
                    <div className="w-full max-w-sm mx-auto lg:w-96">
                        <LoginForm />
                    </div>
                </div>

                {/* Right side - Image/Branding */}
                <div className="relative hidden w-0 lg:block lg:w-1/2">
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                        <div className="w-full max-w-md p-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-primary">Welcome Back</h2>
                                <p className="mt-2 text-muted-foreground">
                                    Sign in to access your dashboard, manage your projects, and continue your journey.
                                </p>
                            </div>
                            <div className="mt-8">
                                <img
                                    src="https://www.ecomare.nl/wp-content/uploads/2017/04/ill-gewone-zeehond-2010-10sw.jpg"
                                    alt="Login illustration"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;