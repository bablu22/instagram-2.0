import { useSession } from "next-auth/react";
import React from "react";
import MiniProfilw from "./MiniProfilw";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestion from "./Suggestion";

const Feeds = () => {
  const { data: session } = useSession();

  return (
    <div
      className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-2xl xl:grid-cols-3 xl:max-w-4xl ${
        !session && "!grid-cols-1 !max-w-2xl"
      }`}
    >
      {/* Left side */}

      <section className="col-span-2 p-2 md:p-0">
        <Stories />
        <Posts />
      </section>
      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20">
            <MiniProfilw />
            <Suggestion />
          </div>
        </section>
      )}
    </div>
  );
};

export default Feeds;
