"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { sendVerificationEmail } from "@/lib/auth-client"

export const SendVerficationEmailForm = () => {
    const [isPending , setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(evt:React.FormEvent<HTMLFormElement>) {
       evt.preventDefault();
       const formData = new FormData(evt.target as HTMLFormElement);

       const email = String(formData.get("email"))

       if(!email) return toast.error("please enter your email")
       
       await sendVerificationEmail({
        email,
        callbackURL:"/auth/verify",
        fetchOptions:{
            onRequest:() =>{
                setIsPending(true)
            },
            onResponse:() =>{
                setIsPending(false)
            },
            onError:(ctx) =>{
                toast.error(ctx.error.message)
            },
            onSuccess:() =>{
                toast.success("Verification email send successfully")
                router.push("/auth/verify/success")
            }
        }
       })
    }
    return (
        <form onSubmit= {handleSubmit} className="max-w-sm w-full space-y-4">
            <div className="flex flex-col gap-2">
               <Label htmlFor="email">Email</Label>
               <Input type="email" id="email" name="email"/>
            </div>
            <Button type="submit" disabled={isPending}>
                Resend Verification Email
            </Button>

        </form>
    )
}