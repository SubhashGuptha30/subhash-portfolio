import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const viewDocRef = doc(db, "views", "portfolio");

export const getViews = async () => {
  try {
    const docSnap = await getDoc(viewDocRef);
    if (docSnap.exists()) {
      return docSnap.data().count;
    } else {
      // Create the document if it doesn't exist
      await setDoc(viewDocRef, { count: 1 });
      return 1;
    }
  } catch (error) {
    console.error("Error getting views:", error);
    return 0;
  }
};

export const incrementViews = async () => {
  try {
    await setDoc(viewDocRef, { count: increment(1) }, { merge: true });
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
};

export const subscribeToViews = (callback: (count: number) => void) => {
  return onSnapshot(viewDocRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().count);
    }
  });
};
