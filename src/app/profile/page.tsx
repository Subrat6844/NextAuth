"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
export default function page() {
	const [user, setUser] = useState("Nothing");
	const submit = async () => {
		try {
			const data = await fetch("api/users/me", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
	            credentials:"include"
			});
			const response = await data.json();
			setUser(response.data.userName);
		} catch (error: any) {
			console.log(error);
			
		}
	};
	return (
		<div className="h-screen flex flex-col items-center justify-center gap-2">
			<h1>Profile</h1>
			<Button onClick={submit}>Get Info</Button>
			{user === "Nothing" ? (
				""
			) : (
				<Button variant={"destructive"}>
					<Link href={`profile/${user}`}>{user}</Link>
				</Button>
			)}
		</div>
	);
}
