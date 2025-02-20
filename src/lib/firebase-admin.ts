import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  projectId: process.env.VITE_FIREBASE_PROJECT_ID
};

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount)
});

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
