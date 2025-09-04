"use client"


import  { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { changePasswordAction } from "@/actions/change-password.action";
import { toast } from "sonner";

interface UpdateUserFormProps {
    name :string;
    image : string;
}

export const UpdateUserForm = ({name, image}:UpdateUserFormProps) => {
    const [isPending , setIsPending] = useState(false);


    async function handleSubmit(evt : React.FormEvent<HTMLFormElement>) {
       evt.preventDefault();

       const formData = new FormData(evt.target as HTMLFormElement);
     
       setIsPending(true);

     const {error} = await changePasswordAction(formData);

     if(error){
        toast.error(error);
     }else{
        toast.success("password changed successfully");
        (evt.target as HTMLFormElement).reset();
     }

     setIsPending(false);

    }
    
    return (
   <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input type="password" id="currentPassword" name="currentPassword" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input type="password" id="newPassword" name="newPassword" />
      </div>

      <Button type="submit" disabled={isPending}>
        Change Password
      </Button>
    </form>
  );
}