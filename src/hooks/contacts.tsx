import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import database from "../config/firebase";

import 'react-native-get-random-values';

export interface ContactState {
  id?: string,
  name: string,
  phone: string,
}

interface ContactContextData {
  contacts: ContactState[];
  getContacts(uid: string): Promise<void>;
  createContact(contactInfo: ContactState, uid: string): Promise<void>;
  deleteContact(contactId: string, uid: string): Promise<void>;
}

const ContactContext = createContext<ContactContextData>({} as ContactContextData);

const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ contacts, setContacts ] = useState<ContactState[]>([]);

  const getContacts = useCallback(async (uid: string) => {
    const querySnapshot = await getDocs(collection(database, `users/${uid}`, "contacts"));
    
    const contactsFetch: ContactState[] = [];
    
    querySnapshot.docs.forEach(doc => doc.exists() && contactsFetch.push({
      id: doc.id,
      name: doc.data().name,
      phone: doc.data().phone,
    }));

    setContacts(sortContacts(contactsFetch))
  }, []);

  const createContact = useCallback(async (contactInfo: ContactState, uid: string) => {
    const docRef = await addDoc(collection(database, `users/${uid}`, "contacts"), contactInfo);
    console.log("Document written with ID: ", docRef.id);
    console.log(docRef);

    setContacts(sortContacts([ ...contacts, { ...contactInfo, id: docRef.id } ]));
  }, [contacts]);

  const deleteContact = useCallback(async (contactId: string, uid: string) => {
    await deleteDoc(doc(database, `users/${uid}`, `contacts/${contactId}`));
    await getContacts(uid);
  }, []);

  const sortContacts = useCallback((contacts: ContactState[]) => {
    return contacts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, getContacts, createContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};

const useContact = (): ContactContextData => {
  const context = useContext(ContactContext);

  if(!context) {
    throw new Error('useContact must be used with a ContactProvider');
  }

  return context;
}

export { ContactProvider, useContact };