"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function page({ params }: any) {
	const router = useRouter();
	const logout = async () => {
		try {
			const response = await fetch("/api/users/logout", {
				method: "GET",
				credentials: "include",
			});

			const data = await response.json();

			if (response.ok && data.success) {
				router.push("/auth/login");
				console.log("Logout successful:", data.message);
			} else {
				console.error("Logout failed:", data.message);
			}
		} catch (error: any) {
			console.error("Logout error:", error);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center gap-2 h-screen">
			<h1 className="bg-destructive p-2 rounded-md text-primary-foreground">
				<span>Hello </span>
				{params.id}
			</h1>
			<Button onClick={logout} variant={"default"}>
				Logout
			</Button>
		</div>
	);
}
