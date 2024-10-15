import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import express from "express";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = express();
let db;

// Initialize Firebase app
const initializeFirebaseApp = () => {
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    console.log("DB Connected");
    return firebaseApp;
  } catch (error) {
    console.error("Firebase Initialize App Error:", error);
    throw new Error("Failed to initialize Firebase");
  }
};

const yourData = {};

const uploadData = async () => {
  try {
    console.log("Uploading Data");

    for (const [key, value] of Object.entries(yourData)) {
     
    // Modify if Neede
      const documentRef = doc(db, "Collection Name", key);
      await setDoc(documentRef, value);
      console.log(`Collection ${key} uploaded`);
    }

    console.log("Data uploaded successfully!");
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

// Start Express server
const startServer = async () => {
  const port = 3000;

  app.listen(port, async () => {
    await initializeFirebaseApp();
    console.log(`Server is running on port ${port}`);
    uploadData().catch(console.error);
  });
};

await startServer();
