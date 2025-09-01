"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInEmailAction } from "../../actions/sign-in-email.action";

export const LoginForm = () => {

  const [Ispending, setIsPending] = useState(false);

  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
      evt.preventDefault();
      const formData = new FormData(evt.target as HTMLFormElement);
  
      const { error } = await signInEmailAction(formData);
  
      if (error) {
        toast.error(error);
        setIsPending(false);
      } else {
        toast.success("Login Successful ,good to have you back");
        router.push("/profile");
      }
  
    }
   

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>

      <Button type="submit" className="w-full" disabled={Ispending}>
        Login
      </Button>
    </form>
  );
};
