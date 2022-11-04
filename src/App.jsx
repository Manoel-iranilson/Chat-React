import { useEffect } from 'react'
import { auth, db } from './services/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import PublicRoutes from './routes/public.routes';
import PrivateRoutes from './routes/private.routes';
import { useState } from 'react';

function App() {
  const [user, setUser] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        photoURL: user.photoURL,
      })
    }
  }, [user])

  return user ? <PrivateRoutes /> : <PublicRoutes />

}

export default App
