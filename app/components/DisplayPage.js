"use client";

import React, { useEffect, useState } from "react";
import { storage } from "../Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const DisplayPage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
      alert("Image Uploaded");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage();
  };

  useEffect(() => {
    const urls = [];
    const unsubscribe = listAll(imageListRef).then((response) => {
      const promises = response.items.map((item) => {
        return getDownloadURL(item).then((url) => {
          urls.push(url);
        });
      });
      Promise.all(promises).then(() => {
        setImageList(urls);
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Share your Memories
          </h2>
        </div>
        <div>
        <form className="max-w-md mt-8 space-y-6" onSubmit={handleSubmit}>
          <label htmlFor="text">Upload Images:</label>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="image" className="sr-only">
                Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Upload an image"
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                }}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {imageList.length === 0 ? (
            <p className="text-lg text-gray-600">
              Please upload your first post
            </p>
          ) : (
            <>
            <h1 className="text-center text-4xl">Art Gallery</h1>
              {imageList.map((url) => {
                return (
                  <div key={url} className="pt-5">
                    <img src={url} className="p-2 h-80 w-96" alt="Uploaded Image" />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayPage;
