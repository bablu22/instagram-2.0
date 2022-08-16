import React from "react";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/outline";
import { signIn, useSession } from "next-auth/react";
import { modalState } from "../atoms/modalAtoms";
import { useRecoilState } from "recoil";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between max-w-4xl mx-5 xl:mx-auto">
        <div className="relative flex-shrink-0 hidden w-24 h-16 rsor-pointer lg:inline-grid ">
          <Image
            src="/logo_large.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram"
          />
        </div>
        <div className="relative flex-shrink-0 w-8 h-8 cursor-pointer lg:hidden ">
          <Image
            src="/logo_small.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram"
          />
        </div>

        <div className="relative p-3 rounde-md">
          <div className="absolute flex items-center justify-center pl-3 mt-2 pointer-events-none lg:mt-1.5">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="block w-full py-1 pl-10 border border-gray-300 bg-gray-50 sm:text-sm focus:ring-black focus:border-black"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="flex items-center justify-start space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-8 cursor-pointer md:hidden" />
          {session ? (
            <>
              <PaperAirplaneIcon className="navBtn" />
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserCircleIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <div className="relative rounded-full cursor-pointer h-9 w-9">
                <Image
                  className="rounded-full"
                  src={session?.user?.image}
                  layout="fill"
                  objectFit="content"
                  alt="Profile"
                />
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
