import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, getDocFromServer, onSnapshot, setDoc } from 'firebase/firestore';
import firebaseConfigData from '../../firebase-applet-config.json';

// Support both embedded JSON configuration and custom Vercel environment variables
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigData.apiKey;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigData.authDomain;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData.projectId;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigData.storageBucket;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigData.messagingSenderId;
const appId = import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigData.appId;
const firestoreDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfigData.firestoreDatabaseId;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// If a custom firestoreDatabaseId is provided and is not default, pass it
export const db = firestoreDatabaseId && firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firestoreDatabaseId)
  : getFirestore(app);

// Test Firestore connectivity on boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'cms', 'main'));
    console.log('[Firestore] Connected to Cloud Database successfully:', projectId);
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firestore] Offline mode active.');
    } else {
      console.log('[Firestore] Online and active.');
    }
    return false;
  }
}

export { onSnapshot, doc, getDoc, setDoc, getDocFromServer };
