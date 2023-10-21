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

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <div className="bg-orange-200">
      <h1 className="text-2xl text-center pt-3 pb-3">
        Welcome to Art Gallery
      </h1>
      <div className="flex items-center justify-center bg-lime-200 border-2 border-slate-500">
        <form className="flex flex-col w-72 h-72 pt-16" onSubmit={handleSubmit}>
          <label htmlFor="text">Share your Memories:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
            required
          />
          <br />
          <button
            className="bg-amber-500 w-16 rounded-md hover:bg-cyan-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[32rem] h-auto">
          {imageList.length === 0 ? (
            <p className="text-lg text-gray-600">
              Please upload your first post
            </p>
          ) : (
            <>
              {imageList.map((url) => {
                return (
                  <div key={url} className="pt-5 w-[32rem]">
                    <img src={url} className="pt-5" alt="Uploaded Image" />
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
