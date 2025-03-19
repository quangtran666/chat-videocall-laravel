import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";

function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-muted">
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
                    <p className="text-muted-foreground">Sign in to access your account or create a new one</p>
                </div>

                <div className="flex flex-col space-y-4">
                    <Button asChild className="w-full" size="lg">
                        <Link to="/auth/login">Sign In</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                        <Link to="/auth/register">Create Account</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;