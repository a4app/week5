import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBWwssAkTeUofeh00BVMzzO_ZgNyURABL8",
	authDomain: "reactapp-263.firebaseapp.com",
	projectId: "reactapp-263",
	storageBucket: "reactapp-263.appspot.com",
	messagingSenderId: "227675856254",
	appId: "1:227675856254:web:ca118ebb4b43cfb872e72f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);