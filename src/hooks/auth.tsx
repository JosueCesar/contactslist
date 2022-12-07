import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import database from "../config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import 'react-native-get-random-values';
import StorageHandler from '../utils/StorageHandler';

export interface AuthState {
  id?: string,
  name: string,
  email: string,
  password?: string,
}

interface AuthContextData {
  user: AuthState;
  loading: boolean;
  getUser(): AuthState;
  createUser(user: AuthState): Promise<void>;
  signIn(credentials: { email: string, password: string }): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStorageUser();
  }, []);

  useEffect(() => {
    if(JSON.stringify(data) !== '{}') {
      saveUserData(data);
    }
  }, [data]);

  const getUser = useCallback(() => data, [data]);

  const saveUserData = useCallback(async (user: AuthState) => {
    console.log('salvando user', user)
    await StorageHandler.add('user', user);
  }, []);

  const loadStorageUser = useCallback(async (): Promise<void> => {
    const storageUser = await StorageHandler.get<AuthState>('user');
    if(storageUser) setData(storageUser);

    console.log('carregando user', storageUser)
  }, []);
  
  const createUser = useCallback(async (user: AuthState) => {
    try {
      if(!user.name)
        throw Error('A name is necessary to register a new user.');
      if(!user.email)
        throw Error('A E-mail is necessary to register a new user.');
      if(!user.password)
        throw Error('A password is necessary to register a new user.');

      const querySnapshot = await getDocs(query(collection(database, "users"), where("email", "==", user.email)));

      querySnapshot.forEach((doc) => {
        if(doc.data().email == user.email)
          throw new Error('User already exists');
      });

      const docRef = await addDoc(collection(database, "users"), user);
      
      setData({ ...user, id: docRef.id });
      await saveUserData({ ...user, id: docRef.id });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, []);

  const signIn = useCallback(async (credentials: { email: string, password: string }) => {
    const querySnapshot = await getDocs(collection(database, "users"));
    querySnapshot.forEach(async (doc) => {
      if(doc.data().email == credentials.email) {
        if(doc.data().password === credentials.password) {
          const user = {
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
          };
          console.log('login', user)
          setData(user);
          await saveUserData(user);
        } else {
          throw Error('Wrong Password.')
        }
      } else {
        throw Error('User not registered.')
      }
    });
  }, []);

  const signOut = useCallback(async () => {
    setData({} as AuthState);
    await saveUserData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, loading, getUser, createUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used with a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };