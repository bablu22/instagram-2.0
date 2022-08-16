import React from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";

const Stories = () => {
  const users = [];

  function createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      //   username: faker.internet.userName(),
      username: "Demo Name",
      avatar: faker.image.avatar(),
    };
  }
  Array.from({ length: 20 }).forEach(() => {
    users.push(createRandomUser());
  });

  return (
    <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-sm scrollbar-thin scrollbar-thumb-gray-800">
      {users.map((profile) => (
        <Story key={profile.userId} data={profile} />
      ))}
    </div>
  );
};

export default Stories;
