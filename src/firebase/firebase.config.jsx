// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCezK3CuGJ6e5Fg-iQwaEV0ymlNPtKdiUU",
  authDomain: "bistro-boss-ba3e0.firebaseapp.com",
  projectId: "bistro-boss-ba3e0",
  storageBucket: "bistro-boss-ba3e0.appspot.com",
  messagingSenderId: "967513696208",
  appId: "1:967513696208:web:f47bc08d3bfc27cd7bfbd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;