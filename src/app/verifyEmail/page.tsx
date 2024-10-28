"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation"; // Use 'next/navigation' here
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [urlToken, setUrlToken] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) setUrlToken(token);
  }, [searchParams]);

  const submit = async () => {
    try {
      if (!urlToken) {
        toast.error("No token");
        return;
      }

      const response = await fetch("/api/users/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: urlToken }), 
      });

	  const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
	  console.log(data);
      toast.success("Email Verified successfully");
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Verification Error:", error);
      toast.error(error.message || "Unexpected error");
      setUrlToken("");
    }
  };
  return (
	<div className="h-screen flex items-center justify-center gap-4 flex-col">
		<h1 className="text-3xl">Verify Your Email Now</h1>
		<Button onClick={submit}>Verify Email</Button>
	</div>
  )
}
