import React from "react";
import Image from "next/image";

const Story = ({ data }) => {
  const { username, avatar } = data;
  return (
    <div>
      <div className="relative h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer hover:scale-125 transition transform duration-75 ease-linear">
        <Image
          className="rounded-full p-[3.5px]"
          src={avatar}
          layout="fill"
          objectFit="contain"
          alt="Avatar"
        />
      </div>
      <div>
        <p className="text-xs truncate w-14">{username}</p>
      </div>
    </div>
  );
};

export default Story;
