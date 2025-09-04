"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { forgetPassword } from "@/lib/auth-client";

export const ForgotPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email.");

    await forgetPassword({
        email,
        redirectTo:"/auth/reset-password",
        fetchOptions:{
            onRequest:() => {
               setIsPending(true);
            },
            onResponse:() => {
                setIsPending(false);
            },
            onError:(ctx) => {
                toast.error(ctx.error.message);
            },
            onSuccess:() =>{
                toast.success("Reset link sent to your email")
                router.push("/auth/forgot-password/success")
            },
        },
    })
  }
    return (
    <form className="max-w-sm w-full space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <Button type="submit" disabled={isPending}>
        Send Reset Link
      </Button>
    </form>
  );
}