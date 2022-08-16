import React, { useEffect, useState } from "react";
import Post from "./Post";
import { onSnapshot, collection, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} data={post.data()} />
      ))}
    </div>
  );
};

export default Posts;
