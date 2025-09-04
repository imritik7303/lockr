import ReturnButton from "@/components/return-button";
import { SendVerficationEmailForm } from "@/components/send-verfication-email-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}
export default async function LoginError({ searchParams }: PageProps) {
  const sp = await searchParams;

  if (!sp.error) redirect("/profile");
  return (
    <div
      className="px-8 py-16 container
    mx-auto max-w-screen-lg space-y-8"
    >
      <div className="space-y-8">
        <ReturnButton href="/auth/login" label="Login" />
        <h1 className="text-3xl font-bold">Email Verification </h1>
      </div>
      <p className="text-destructive">
        {sp.error === "invlaid_token" || sp.error === "token_expired"
          ? "Your token is expired or invlaid please request a new one"
          : sp.error === "email_not_verified"
          ? "Please verify Your Email , or requets an new verification below"
          : "Oops! Something went wrong. Please try again."}
      </p>
      <SendVerficationEmailForm />
    </div>
  );
}
