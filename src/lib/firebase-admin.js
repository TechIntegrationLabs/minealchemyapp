import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '../../');

// Load environment variables
config({ path: join(rootDir, '.env.local') });

// Log environment variables for debugging (without sensitive data)
console.log('Firebase Admin Environment:', {
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
  hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
});

// Initialize Firebase Admin
function initializeFirebaseAdmin() {
  try {
    if (!getApps().length) {
      if (!process.env.VITE_FIREBASE_PROJECT_ID) {
        throw new Error('VITE_FIREBASE_PROJECT_ID is required');
      }
      if (!process.env.FIREBASE_CLIENT_EMAIL) {
        throw new Error('FIREBASE_CLIENT_EMAIL is required');
      }
      if (!process.env.FIREBASE_PRIVATE_KEY) {
        throw new Error('FIREBASE_PRIVATE_KEY is required');
      }

      console.log('Initializing Firebase Admin with project:', process.env.VITE_FIREBASE_PROJECT_ID);
      
      // The private key is already properly formatted with \n in the .env file
      const privateKey = process.env.FIREBASE_PRIVATE_KEY;
      
      return initializeApp({
        credential: cert({
          projectId: process.env.VITE_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
    }
    return getApp();
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

// Initialize the app
const app = initializeFirebaseAdmin();
export const adminAuth = getAuth(app);
