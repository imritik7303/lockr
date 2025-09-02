import { DeleteUserButton, PlaceholderDeleteUserButton } from "@/components/delete-user-button";
import ReturnButton from "@/components/return-button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashBoard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "ADMIN") {
    return (
      <div className="relative min-h-screen bg-gray-50">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/diagonal-stripes.png')] opacity-10" />

        <div className="relative container mx-auto max-w-screen-lg px-6 py-16 space-y-10">
          {/* Profile button */}
          <ReturnButton href="/profile" label="Profile" />

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>

          {/* Forbidden alert */}
          <div className="rounded-xl bg-red-600 px-6 py-4 shadow-md flex items-center gap-3">
            <span className="text-2xl">🚫</span>
            <p className="text-lg font-semibold text-white">FORBIDDEN</p>
          </div>
        </div>
      </div>
    );
  }

  
  const user = await prisma.user.findMany({
    orderBy:{
        name:"asc"
    }
  })
  return <div className="relative min-h-screen bg-gray-50">
  {/* Background pattern */}
  <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/diagonal-stripes.png')] opacity-10" />

  <div className="relative container mx-auto max-w-screen-lg px-6 py-16 space-y-10">
    {/* Profile button */}
    <ReturnButton
      href="/profile"
      label="Profile"
    />

    {/* Title */}
    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
      Admin Dashboard
    </h1>

    {/* Access Granted alert */}
    <div className="rounded-xl bg-green-600 px-6 py-4 shadow-md flex items-center gap-3">
      <span className="text-2xl">✅</span>
      <p className="text-lg font-semibold text-white">ACCESS GRANTED</p>
    </div>
  </div>
  <div className="w-full overflow-x-auto">
        <table className="table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr className="border-b text-sm text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-center">Role</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {user.map((user) => (
              <tr key={user.id} className="border-b text-sm text-left">
                <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">{user.role}</td>
                <td className="px-4 py-2 text-center">
                    {user.role === "USER" ? <DeleteUserButton userId={user.id}/> : <PlaceholderDeleteUserButton/>
                    }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
</div>

}
