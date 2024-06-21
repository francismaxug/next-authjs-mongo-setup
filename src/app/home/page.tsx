import Image from "next/image"
import Logout from "@/components/Logout"
import { auth } from "@/auth"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

import { redirect } from "next/navigation"

const HomePage = async () => {
  const session = await auth()

  if (!session?.user) redirect("/")

  return (
    <div className="flex flex-col items-center m-4">
      {session?.user?.email && session.user.name ? (
        <>
          {" "}
          <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
          {session?.user.image && (
            <Image
              src={session?.user?.image!}
              alt={session?.user?.name!}
              width={500}
              height={500}
              className="rounded-full w-40 h-40"
            />
          )}
        </>
      ) : (
        <h1 className="text-3xl my-2">Welcome, {session?.user?.email}</h1>
      )}

      <Logout />
    </div>
  )
}

export default HomePage
