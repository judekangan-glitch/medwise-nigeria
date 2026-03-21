// Firebase Configuration Setup Guide for MedWise Nigeria

// STEP 1: Install Firebase
// npm install -D firebase

// STEP 2: Create this file and name it firebaseConfig.js
// Update with your Firebase credentials from https://console.firebase.google.com

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  // REPLACE WITH YOUR FIREBASE CREDENTIALS
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'your-app.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'your-app.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'your-app-id'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Initialize Cloud Firestore
export const db = getFirestore(app)

// Initialize Cloud Storage
export const storage = getStorage(app)

export default app

// ============================================
// SETUP INSTRUCTIONS
// ============================================

/*

1. CREATE FIREBASE PROJECT
   - Go to https://console.firebase.google.com
   - Click "Create Project"
   - Name: "MedWise Nigeria"
   - Uncheck Analytics (optional)
   - Click Create

2. ENABLE AUTHENTICATION
   - Go to Build → Authentication
   - Click "Get Started"
   - Enable "Email/Password"
   - Enable "Google" (optional)

3. CREATE FIRESTORE DATABASE
   - Go to Build → Firestore Database
   - Click "Create Database"
   - Select region: Select closest to Nigeria (usually London/Europe)
   - Start in production mode
   - Create

4. SET FIRESTORE SECURITY RULES
   Replace the rules with:

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       
       // Users collection
       match /users/{uid} {
         allow read, write: if request.auth.uid == uid;
       }
       
       // User medications (private)
       match /users/{uid}/medications/{medId} {
         allow read, write: if request.auth.uid == uid;
       }
       
       // User reminders (private)
       match /users/{uid}/reminders/{reminderId} {
         allow read, write: if request.auth.uid == uid;
       }
       
       // Public verify database (read-only)
       match /nafdacVerifications/{code} {
         allow read: if true;
       }
       
       // Public fake drug alerts (read-only)
       match /fakeDrugAlerts/{alertId} {
         allow read: if true;
       }
     }
   }

5. CREATE DATABASE COLLECTIONS
   Collections to create manually:
   - /users/{uid}
   - /nafdacVerifications
   - /fakeDrugAlerts

6. UPDATE .env.local
   Create .env.local in project root and add:

   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id

7. SETUP IS COMPLETE
   Your Firebase database is now ready to use!

FREE TIER LIMITS (Firestore):
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day
- 1GB stored data
- Perfect for MVP testing

*/
