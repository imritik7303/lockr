import { ForgotPasswordForm } from "@/components/forgot-password-form";
import ReturnButton from "@/components/return-button";


export default function ForgotPassword() {
  return (
      <div className="px-8 py-16 container
        mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-8">
                <ReturnButton href="/auth/login" label="Login"/>
                <h1 className="text-3xl font-bold">Forgot Password</h1>
            </div>
           <p className="text-muted-foreground">
           please enter your email to recieve a password reset link
          </p>
         <ForgotPasswordForm/>
        </div>
  )
}
