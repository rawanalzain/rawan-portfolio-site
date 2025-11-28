// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    OAuthProvider,
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyClROFP1gX4BM42VUPLMANbBgB_69Mp8sk",
  authDomain: "rawan-portfolio-auth.firebaseapp.com",
  projectId: "rawan-portfolio-auth",
  storageBucket: "rawan-portfolio-auth.firebasestorage.app",
  messagingSenderId: "404413932736",
  appId: "1:404413932736:web:7354a0178bdb8e6bfab925"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

// DOM Elements
const loginContainer = document.getElementById('login-container');
const userContainer = document.getElementById('user-container');
const userNameDisplay = document.getElementById('user-name');
const googleLoginBtn = document.getElementById('googleLogin');
const microsoftLoginBtn = document.getElementById('microsoftLogin');
const logoutBtn = document.getElementById('logoutBtn');

// 1. Handle Google Login
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log("Logged in with Google:", result.user);
            }).catch((error) => {
                console.error("Error:", error);
                alert("Login Failed: " + error.message);
            });
    });
}

// 2. Handle Microsoft Login
if (microsoftLoginBtn) {
    microsoftLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signInWithPopup(auth, microsoftProvider)
            .then((result) => {
                console.log("Logged in with Microsoft:", result.user);
            }).catch((error) => {
                console.error("Error:", error);
                alert("Login Failed: " + error.message);
            });
    });
}

// 3. Handle Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            console.log("User signed out");
            alert("You have logged out.");
        });
    });
}

// 4. Listen for Login State Changes (Updates UI)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        if(loginContainer) loginContainer.classList.add('d-none'); // Hide login button
        if(userContainer) userContainer.classList.remove('d-none'); // Show user profile
        if(userNameDisplay) userNameDisplay.innerText = `Hi, ${user.displayName ? user.displayName.split(' ')[0] : 'User'}`;
    } else {
        // User is signed out
        if(loginContainer) loginContainer.classList.remove('d-none'); // Show login button
        if(userContainer) userContainer.classList.add('d-none'); // Hide user profile
    }
});
