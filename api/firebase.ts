import { initializeApp } from "@firebase/app";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWR662k-aDjWd-zJEUAgLrMrnhON94CDk",
  authDomain: "books-7fd0f.firebaseapp.com",
  projectId: "books-7fd0f",
  storageBucket: "books-7fd0f.firebasestorage.app",
  messagingSenderId: "777263799376",
  appId: "1:777263799376:web:c7b4a5fc641fa9797d4555",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { db, auth };
