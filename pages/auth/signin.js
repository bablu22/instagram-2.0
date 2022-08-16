import React from "react";
import { getProviders, signIn as googleSignIn } from "next-auth/react";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

const signin = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <div className="relative flex items-center h-screen py-16 bg-gradient-to-br from-sky-50 to-gray-200 jusify-center">
            <div className="container relative px-6 m-auto text-gray-500 md:px-12 xl:px-40">
              <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                <div className="bg-white shadow-xl rounded-xl">
                  <div className="flex items-center justify-center w-full pt-5">
                    <Link href="/">
                      <HomeIcon className="h-8 text-gray-800 cursor-pointer" />
                    </Link>
                  </div>
                  <div className="p-6 sm:p-10">
                    <div className="relative w-full h-20">
                      <Image
                        src="/logo_large.png"
                        loading="lazy"
                        className=""
                        alt="tailus logo"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    {/* <h2 className="mb-8 text-2xl font-bold text-cyan-900">
                      Sign in to unlock the <br /> best of Tailus.
                    </h2> */}
                    <div className="grid my-10 space-y-4">
                      <button
                        onClick={() =>
                          googleSignIn(provider.id, { callbackUrl: "/" })
                        }
                        className="h-12 px-6 transition duration-300 border-2 border-gray-300 rounded-full group hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                      >
                        <div className="relative flex items-center justify-center space-x-4">
                          <img
                            src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                            className="absolute left-0 w-5"
                            alt="google logo"
                          />
                          <span className="block text-sm font-semibold tracking-wide text-gray-700 transition duration-300 w-max group-hover:text-blue-600 sm:text-base">
                            Sign in with {provider.name}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default signin;
