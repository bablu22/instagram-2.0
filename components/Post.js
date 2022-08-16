import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { ChatIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/outline";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import SingleComment from "./SingleComment";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../firebase";

const Post = ({ data, id }) => {
  const { username, profileImg, image, caption } = data;
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [commentS, setCommentS] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLikes, setHasLikes] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setCommentS(snapshot.docs);
        }
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [id]
  );

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session?.user?.uid]);

  const likePost = async () => {
    if (hasLikes) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    setComment("");
  };

  return (
    <div className="p-5 bg-white border rounded-sm my-7">
      <div className="flex items-center ">
        <div className="relative w-10 h-10 mr-3">
          <Image
            src={profileImg}
            layout="fill"
            objectFit="contain"
            alt="Profile"
            className="object-contain p-1 border rounded-full "
          />
        </div>
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* Post image */}
      <div className="relative object-cover w-auto mx-auto mt-3 h-96">
        <Image src={image} layout="fill" alt="Profile" className="rounded-md" />
      </div>
      <hr className="my-3" />

      {/* Button */}
      {session && (
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {hasLikes ? (
              <HeartIconSolid onClick={likePost} className="text-red-500 btn" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Caption */}
      {likes.length > 0 && (
        <span className="my-1 text-sm font-bold">{likes.length} likes</span>
      )}
      <p className="my-2 truncate">
        <span className="mr-1 font-bold">{username} </span>
        {caption}
      </p>

      {/* Comment box */}

      {commentS.length > 0 && (
        <div className="overflow-y-scroll max-h-36 scrollbar-thin scrollbar-thumb-gray-800">
          {commentS.map((comment) => (
            <SingleComment
              key={comment.id}
              time={comment.data().timestamp}
              data={comment.data()}
            />
          ))}
        </div>
      )}

      {session && (
        <form onSubmit={sendComment} className="flex items-center py-4">
          <EmojiHappyIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            // disabled={!comment.trim()}
            type="text"
            required
            placeholder="Add a comment...."
            className="flex-1 px-3 border-b outline-none focus-ring-0"
          />
          <button type="submit" className="font-semibold text-blue-500">
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
