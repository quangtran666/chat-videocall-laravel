import RegisterForm from "@/components/auth/RegisterForm.tsx";

function Register() {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-background to-muted">
            {/* Left side - Image/Branding */}
            <div className="relative hidden w-0 lg:block lg:w-1/2">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                    <div className="w-full max-w-md p-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-primary">Join Our Community</h2>
                            <p className="mt-2 text-muted-foreground">
                                Create an account to unlock all features and start your journey with us.
                            </p>
                        </div>
                        <div className="mt-8">
                            <img
                                src="https://www.antarctica.gov.au/site/assets/files/45640/weddell-seal.1600x0.jpg"
                                alt="Registration illustration"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex flex-col justify-center w-full px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:w-1/2 lg:ml-auto">
                <div className="w-full max-w-sm mx-auto lg:w-96">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}

export default Register;