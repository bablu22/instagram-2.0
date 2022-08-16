import React, { Fragment, useRef, useState } from "react";
import { modalState } from "../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/outline";
import { CameraIcon } from "@heroicons/react/outline";
import Image from "next/image";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";

const Modal = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [looding, setLooding] = useState(false);
  const filePicker = useRef(null);
  const caption = useRef(null);
  const [selectFile, setSelectFile] = useState(null);

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (rederEvent) => {
      setSelectFile(rederEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (looding) {
      return;
    }
    setLooding(true);

    const docref = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      caption: caption.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docref.id}/image`);

    await uploadString(imageRef, selectFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docref.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLooding(false);
    setSelectFile(null);
  };

  return (
    <div>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Upload your post
                    </Dialog.Title>
                    <XCircleIcon
                      onClick={() => setOpen(false)}
                      className="h-8 mb-2 text-red-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    {selectFile ? (
                      <div className="relative w-full rounded-md h-36 ">
                        <Image
                          src={selectFile}
                          layout="fill"
                          objectFit="contain"
                          alt="Image"
                          onClick={() => setSelectFile(null)}
                          className="rounded-md "
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => filePicker.current.click()}
                        className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full cursor-pointer font-sanx"
                      >
                        <CameraIcon className="text-red-600 h-7 w-7" />
                      </div>
                    )}
                  </div>

                  <div className="my-2">
                    <div>
                      <input
                        type="file"
                        name=""
                        id=""
                        ref={filePicker}
                        onChange={addImage}
                        hidden
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        name=""
                        id=""
                        required
                        ref={caption}
                        placeholder="Enter your caption..."
                        className="w-full py-1 text-center border rounded-md outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={uploadPost}
                      disabled={!selectFile}
                      className="block w-full px-4 py-2 mt-6 font-bold text-center text-white bg-indigo-500 rounded cursor-pointer"
                    >
                      Upload Post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;
