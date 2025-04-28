import { useState, useEffect } from 'react';
import { 
  User,
  UserCredential,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthActions {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

export function useAuth(): { user: User | null; loading: boolean; authActions: AuthActions } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setPersistenceType = async (rememberMe: boolean) => {
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );
  };

  const authActions: AuthActions = {
    login: async (email, password, rememberMe = false) => {
      await setPersistenceType(rememberMe);
      await signInWithEmailAndPassword(auth, email, password);
    },
    register: async (email, password, name) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
        setUser({ ...userCredential.user, displayName: name });
      }
    },
    logout: () => signOut(auth),
    resetPassword: (email) => sendPasswordResetEmail(auth, email),
    updateUserProfile: async (displayName, photoURL) => {
      if (!auth.currentUser) throw new Error("No authenticated user");
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser({ 
        ...auth.currentUser, 
        displayName,
        photoURL: photoURL || auth.currentUser.photoURL 
      });
    }
  };

  return { user, loading, authActions };
}