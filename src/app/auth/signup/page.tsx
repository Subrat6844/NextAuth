"use client";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DemoCreateAccount() {
	const router = useRouter();
	const [user, setUser] = useState({
		email: "",
		password: "",
		userName: "",
	});
	const submit =async () => {
		try {
			if (!user.email || !user.password || !user.userName) {
				toast.error("All fields are required");
				return
			}
			const response = await fetch("/api/users/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({...user}),
			})
			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.message || "Something went wrong")
			}
			console.log(data);
			router.push("/auth/login");
			toast.success("Form Submitted successfully");
		} catch (error:any) {
			console.log(error);
			toast.error(error.message);
			setUser({
				email: "",
				password: "",
				userName: "",
			});
		}
	};
	return (
		<>
			<div className="flex min-h-screen items-center justify-center">
				<Card className="w-[350px]">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl">Create an account</CardTitle>
						<CardDescription>
							Enter your email below to create your account
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid grid-cols-2 gap-6">
							<Button variant="outline">
								<Icons.gitHub className="mr-2 h-4 w-4" />
								Github
							</Button>
							<Button variant="outline">
								<Icons.google className="mr-2 h-4 w-4" />
								Google
							</Button>
						</div>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								value={user.userName}
								onChange={(e) => setUser({ ...user, userName: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={user.email}
								placeholder="m@example.com"
								onChange={(e) => setUser({ ...user, email: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button onClick={submit} className="w-full">
							Create account
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
