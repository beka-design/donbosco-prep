import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Register
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.onclick = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      subscription: "inactive",
      createdAt: new Date()
    });

    window.location.href = "dashboard.html";
  };
}

// Login
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.onclick = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  };
}

// Google
const googleBtn = document.getElementById("googleLogin");
if (googleBtn) {
  googleBtn.onclick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "users", result.user.uid), {
      email: result.user.email,
      subscription: "inactive",
      createdAt: new Date()
    }, { merge: true });

    window.location.href = "dashboard.html";
  };
}

// Facebook
const fbBtn = document.getElementById("facebookLogin");
if (fbBtn) {
  fbBtn.onclick = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "users", result.user.uid), {
      email: result.user.email,
      subscription: "inactive",
      createdAt: new Date()
    }, { merge: true });

    window.location.href = "dashboard.html";
  };
}