import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function testFirebaseConnection() {
  try {
    // Try to list all collections
    const collections = await getDocs(collection(db, '__dummy__'));
    console.log('Firebase connection successful');
    return true;
  } catch (error: any) {
    console.error('Firebase connection test error:', {
      code: error.code,
      message: error.message,
      name: error.name
    });
    return false;
  }
}
