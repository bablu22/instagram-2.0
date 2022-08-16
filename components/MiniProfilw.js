import React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const MiniProfilw = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-10 ml-10">
      <div className="relative w-12 h-12">
        <Image
          className="rounded-full border p-[2px]"
          src={session?.user?.image}
          layout="fill"
          alt="Profile"
        />
      </div>
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button onClick={signOut} className="text-sm font-semibold text-blue-400">
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfilw;
