import { useState } from "react";
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

const useApp = () => {
  const [imagePath, setImagePath] = useState("");
  const [app, setApp] = useState({});
  const appsCollectionRef = collection(db, "apps");

  /* const getApp = async (packageId) => {
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
      const appdata = await response.data;
      setApp(appdata);
      // console.log(response.data);
      return appdata;
    } catch (error) {
      console.error(error);
    }
  }; */
  const getApp = (packageId) => {
    axios
      .get(" https://data.42matters.com/api/v2.0/android/apps/lookup.json", {
        params: {
          access_token: "8be68df377efc75f6a9714b42bd6cd1bbe29fae6",
          p: packageId,
        },
      })
      .then((response) => {
        const appdata = response.data;
        console.log(appdata);
        setApp(appdata);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addApp = async (values) => {
    await addDoc(appsCollectionRef, {
      title: values.title,
      category: values.category,
      description: values.description,
      downloads: values.downloads,
      icon: values.icon_72,
      rating: values.rating,
      screenshots: values.screenshots,
      developer: values.developer,
      playStoreLink: values.market_url,
      uploadDate: values.created,
      reviews: [],
      featured: false,
    });
  };

  const deleteApp = async (appId) => {
    const appDoc = doc(appsCollectionRef, appId);
    deleteDoc(appDoc);
  };

  const featureApp = async (appId, featureApp) => {
    const data = doc(appsCollectionRef, appId);
    await updateDoc(data, {
      featured: featureApp,
    });
  };

  const updateApp = async (values, appId, imagePath) => {
    const data = doc(appsCollectionRef, appId);
    await updateDoc(data, {
      title: values.title,
      category: values.category,
      rating: values.rating,
      description: values.description,
      imagePath: imagePath,
    });
  };

  const uploadappIcon = async (appIcon, appId) => {
    if (appIcon == null) return;
    const appIconRef = ref(storage, `app_images/${appId}`);
    uploadBytes(appIconRef, appIcon);
    let path = await getDownloadURL(appIconRef);
    setImagePath(path);
  };

  return {
    getApp,
    addApp,
    deleteApp,
    featureApp,
    updateApp,
    uploadappIcon,
    imagePath,
    app,
  };
};

export default useApp;
