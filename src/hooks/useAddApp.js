import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../api/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

const useAddApp = (packageId) => {
  const [app, setApp] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getApp = async () => {
      try {
        const response = await axios.get(
          " https://data.42matters.com/api/v2.0/android/apps/lookup.json",
          {
            params: {
              access_token: "8be68df377efc75f6a9714b42bd6cd1bbe29fae6",
              p: packageId,
            },
          }
        );
        if (isMounted === true) {
          setApp(response.data);
        }
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getApp();

    return () => (isMounted = false);
  }, [packageId]);

  return { app };
};

export default useAddApp;
