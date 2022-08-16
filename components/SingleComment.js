import Image from "next/image";
import React from "react";
import Moment from "react-moment";

const SingleComment = ({ data, time }) => {
  const { comment, username, userImg } = data;

  return (
    <div className="flex-col w-full py-2 mt-2 border-b border-gray-200 sm:px-4 sm:py-1 md:px-4">
      <div className="flex flex-row md-10">
        <div className="relative h-7 w-7 ">
          <Image
            src={userImg}
            layout="fill"
            objectFit="contain"
            alt="Profile"
            className="border-2 border-gray-300 rounded-full"
          />
        </div>

        <div className="flex-col ">
          <div className="flex items-center flex-1 px-4 text-sm font-bold leading-tight">
            {username}
            <div className="ml-3 text-xs font-normal text-gray-500">
              <Moment fromNow>{time?.toDate()}</Moment>
            </div>
          </div>
          <div className="flex px-2 ml-2 text-sm font-medium leading-loose text-gray-600 jus">
            {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
