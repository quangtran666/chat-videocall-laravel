import { Checkbox } from "@/components/ui/checkbox";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {LoginSchema, LoginType} from "@/types/auth/Login.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {Link} from "react-router";

type LoginCredentialsFormProps = {
    onSubmit: (data: LoginType) => Promise<void>
    loading: boolean
    disabled: boolean
}

export function LoginFormCredentials({ onSubmit, loading, disabled }: LoginCredentialsFormProps) {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="name@example.com" {...field} />
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
                            <div className="flex items-center justify-between">
                                <FormLabel>Password</FormLabel>
                                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={loading || disabled}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign in"
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default LoginFormCredentials;