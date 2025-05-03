import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAxcTY6SyW5sP_RyuegHIweyU2zntv1opk',
  authDomain: 'mahendran-in.firebaseapp.com',
  projectId: 'mahendran-in',
  storageBucket: 'mahendran-in.firebasestorage.app',
  messagingSenderId: '1043480034309',
  appId: '1:1043480034309:web:fddba6f06f267e9705706c',
  measurementId: 'G-HRJCNCV3V6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const rtdb = getDatabase(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { app, analytics, rtdb, db };
export { logEvent };
