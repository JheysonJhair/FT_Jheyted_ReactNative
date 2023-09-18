import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDSuCEZHu4P0_UdC4-YTd_0bR2muylpGuE",
  authDomain: "chatapp-356e4.firebaseapp.com",
  projectId: "chatapp-356e4",
  storageBucket: "chatapp-356e4.appspot.com",
  messagingSenderId: "219241986740",
  appId: "1:219241986740:web:712624115f636e2bd1f5e1",
  databaseURL: Constants.expoConfig.extra.databaseURL,
  //   @deprecated is deprecated Constants.manifest
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
