import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";

const useAppRequest = () => {
  const appRequestsCollectionRef = collection(db, "app-requests");

  const deleteAppRequest = async (appRequestId) => {
    const appDoc = doc(appRequestsCollectionRef, appRequestId);
    deleteDoc(appDoc);
  };

  const updateAppRequest = async (appRequestId) => {
    const data = doc(appRequestsCollectionRef, appRequestId);
    await updateDoc(data, {
      approved: true,
    });
  };

  return { updateAppRequest, deleteAppRequest };
};

export default useAppRequest;
