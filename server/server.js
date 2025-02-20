import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { adminAuth } from '../src/lib/firebase-admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') });

// Validate required environment variables
if (!process.env.CLERK_SECRET_KEY) {
  throw new Error('CLERK_SECRET_KEY is required');
}

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5189', // Update this to match your Vite dev server port
  credentials: true
}));
app.use(express.json());

// Firebase token endpoint
app.post('/api/firebase-token', ClerkExpressWithAuth({
  jwtKey: process.env.CLERK_SECRET_KEY,
  authorizedParties: ['http://localhost:5189'] // Update this to match your Vite dev server
}), async (req, res) => {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ error: 'No user ID in session' });
    }

    const userId = req.auth.userId;
    console.log('Generating Firebase token for user:', userId);

    const firebaseToken = await adminAuth.createCustomToken(userId);
    console.log('Firebase token generated successfully');

    res.json({ firebaseToken });
  } catch (error) {
    console.error('Error generating Firebase token:', error);
    res.status(500).json({ 
      error: 'Failed to generate Firebase token',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const PORT = process.env.PORT || 5000;

// Start server
try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', {
      nodeEnv: process.env.NODE_ENV,
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      hasClerkKey: !!process.env.CLERK_SECRET_KEY,
      hasFirebaseEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasFirebaseKey: !!process.env.FIREBASE_PRIVATE_KEY,
    });
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}
