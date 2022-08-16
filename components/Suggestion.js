import React from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";

const Suggestion = () => {
  const users = [];

  function createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      //   username: faker.internet.userName(),
      username: "Demo Name",
      avatar: faker.image.avatar(),
      birthdate: faker.date.birthdate(),
    };
  }
  Array.from({ length: 6 }).forEach(() => {
    users.push(createRandomUser());
  });

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-500">Suggestion for you</h3>
        <button className="font-medium text-gray-400">See all</button>
      </div>

      {users.map((user) => (
        <div
          key={user.userId}
          className="flex items-center justify-between mt-3"
        >
          <div className="relative w-10 h-10">
            <Image
              className="rounded-full border p-[2px]"
              src={user.avatar}
              layout="fill"
              alt="Profile"
            />
          </div>
          <div className="flex-1 ml-4">
            <h2>{user.username}</h2>
          </div>
          <button className="text-sm text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestion;
