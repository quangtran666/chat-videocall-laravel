import RegisterForm from "@/components/auth/RegisterForm/RegisterForm.tsx";

function Register() {
    return (
        <div className="flex min-h-screen">
            {/* Left side - Image/Branding (Fixed) */}
            <div className="fixed top-0 bottom-0 left-0 hidden lg:block lg:w-1/2">
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

            {/* Right side - Form (Scrollable) */}
            <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen overflow-y-auto bg-gradient-to-b from-background to-muted">
                <div className="flex flex-col justify-center w-full px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="w-full max-w-sm mx-auto lg:w-96">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;