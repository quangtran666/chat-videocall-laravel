import {RegisterSchema, RegisterType} from "@/types/auth/Register.ts";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Link} from "react-router";

type RegisterCredentialsFormProps = {
    onSubmit: (data: RegisterType) => Promise<void>
    loading: boolean
    disabled: boolean
}

function RegisterFormCredentials({ onSubmit, loading, disabled }: RegisterCredentialsFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<RegisterType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            terms: false,
        },
        mode: "onChange",
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormDescription>This will be your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="name@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                            </FormControl>
                            {/*{password && <PasswordStrengthIndicator password={password} />}*/}
                            <FormDescription>
                                Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal" >
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-primary hover:underline">
                                        terms of service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-primary hover:underline">
                                        privacy policy
                                    </Link>
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={loading || disabled}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create account"
                    )}
                </Button>
            </form>
        </Form>
    );
}

export default RegisterFormCredentials;