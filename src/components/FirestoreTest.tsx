import { useState } from 'react';
import { journalService } from '../services/journal';
import { getAuth } from 'firebase/auth';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

export function FirestoreTest() {
  const [testResult, setTestResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { isLoading: isFirebaseLoading, error: firebaseError } = useFirebaseAuth();

  const runTest = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      setError('Please wait for Firebase authentication');
      return;
    }

    setIsLoading(true);
    setError('');
    setTestResult('');
    
    try {
      console.log('Starting Firestore test...', {
        currentUser: auth.currentUser.uid,
        isAnonymous: auth.currentUser.isAnonymous
      });
      const result = await journalService.testAccess();
      setTestResult(result ? 'Test successful!' : 'Test failed');
      console.log('Test completed:', result);
    } catch (err) {
      console.error('Test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFirebaseLoading) {
    return (
      <div className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Firestore Connection Test</h2>
        <div className="text-gray-600">Initializing Firebase...</div>
      </div>
    );
  }

  if (firebaseError) {
    return (
      <div className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Firestore Connection Test</h2>
        <div className="p-3 bg-red-100 text-red-700 rounded">
          Firebase Error: {firebaseError.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Firestore Connection Test</h2>
      
      <button
        onClick={runTest}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test Firestore Connection'}
      </button>

      {testResult && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
          {testResult}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}
