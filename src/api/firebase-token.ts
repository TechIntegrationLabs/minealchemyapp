import express from 'express';
import cors from 'cors';
import { adminAuth } from '../lib/firebase-admin';
import { Clerk } from '@clerk/backend';

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/firebase-token', async (req, res) => {
  try {
    const { clerkUserId } = req.body;
    
    // Verify the Clerk session
    const sessionToken = req.headers.authorization?.split('Bearer ')[1];
    if (!sessionToken) {
      return res.status(401).json({ error: 'No session token provided' });
    }

    const session = await clerk.sessions.verifySession(sessionToken, clerkUserId);
    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    // Generate a Firebase custom token
    const firebaseToken = await adminAuth.createCustomToken(clerkUserId);
    
    res.json({ firebaseToken });
  } catch (error) {
    console.error('Error generating Firebase token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;
